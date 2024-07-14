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

    switch (e.code) {
      case "P2025":
        message = "Invite code not found.";
    }

    res.status(500).json({
      error: message,
    });
  }
}),
  (exports.inviteRouter = router);
