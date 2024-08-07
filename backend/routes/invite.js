const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { authenticate } = require("../auth");
const randomstring = require("randomstring");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { quizId, email, userId } = req.body;

    const author = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      select: {
        authorId: true,
      },
    });

    if (author === null) {
      res.status(404).json({
        error: "Quiz not found.",
      });
      return;
    }

    if (author.authorId !== userId) {
      res.status(403).json({
        error: "You are not authorized to invite users to this quiz.",
      });
      return;
    }

    if (!email) {
      const code = randomstring.generate({
        length: 6,
        readable: true,
        capitalization: "uppercase",
      });

      const invite = await prisma.invite.create({
        data: {
          code,
          quiz: {
            connect: {
              id: quizId,
            },
          },
        },
      });

      res.json(invite);
    } else {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          invites: true,
        },
      });

      if (user === null) {
        res.status(404).json({
          error: "User not found.",
        });
        return;
      }

      if (user.invites.some((invite) => invite.quizId === quizId)) {
        res.status(403).json({
          error: "This user has already been invited to this quiz.",
        });
        return;
      }

      const invite = await prisma.invite.create({
        data: {
          quiz: {
            connect: {
              id: quizId,
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      res.json(invite);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Server error. Please try again.",
    });
  }
});

router.post("/redeem", authenticate, async (req, res) => {
  try {
    const { code, userId } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        invites: true,
      },
    });

    const quiz = await prisma.invite.findUnique({
      where: {
        code,
      },
      select: {
        quizId: true,
      },
    });

    if (quiz === null) {
      res.status(404).json({
        error: "Invite code not found.",
      });
      return;
    }

    if (user.invites.some((invite) => invite.quizId === quiz.quizId)) {
      res.status(403).json({
        error: "You have already been invited to this quiz.",
      });
      return;
    }

    const invite = await prisma.invite.update({
      where: {
        code,
      },
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        code: null,
      },
    });

    res.json(invite);
  } catch (e) {
    let message = "Server error. Please try again.";
    console.log(e);

    switch (e.code) {
      case "P2025":
        message = "Invite code not found.";
    }

    res.status(500).json({
      error: message,
    });
  }
}),
  router.get("/", authenticate, async (req, res) => {
    try {
      const { userId } = req.body;

      const invites = await prisma.invite.findMany({
        where: {
          userId,
        },
        select: {
          isUsed: true,
          id: true,
          quiz: {
            select: {
              id: true,
              title: true,
              description: true,
              background: true,
              author: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      res.json(invites);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        error: "Server error. Please try again.",
      });
    }
  });

exports.inviteRouter = router;
