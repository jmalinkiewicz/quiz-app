const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { authenticate } = require("../auth");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/available", authenticate, async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      where: {
        invites: {
          some: {
            userId: req.body.userId,
          },
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        background: true,
      },
    });

    if (quizzes.length === 0) {
      res.status(404).json({
        error: "No quizzes available.",
      });
      return;
    }

    res.json(quizzes);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Server error. Please try again.",
    });
  }
});

router.get("/start/:quizId", authenticate, async (req, res) => {
  try {
    const { quizId } = req.params;
    const { userId } = req.body;

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        background: true,
        questions: {
          select: {
            id: true,
            text: true,
            answers: {
              select: {
                id: true,
                text: true,
              },
            },
          },
        },
      },
    });

    if (quiz === null) {
      res.status(404).json({
        error: "Quiz not found.",
      });
      return;
    }

    const invite = await prisma.invite.findFirst({
      where: {
        userId,
        quizId,
      },
    });

    if (invite === null) {
      res.status(403).json({
        error: "Invite not found.",
      });
      return;
    }

    res.json(quiz);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Server error. Please try again.",
    });
  }
});

router.post("/submit", authenticate, async (req, res) => {
  try {
    const { quizId, answers, userId } = req.body;

    const invite = await prisma.invite.findFirst({
      where: {
        userId,
        quizId,
      },
    });

    if (invite === null) {
      res.status(403).json({
        error: "Invite not found.",
      });
      return;
    }

    if (invite.isUsed) {
      res.status(403).json({
        error: "All invites have been used.",
      });
      return;
    }

    if (answers.length === 0) {
      res.status(400).json({
        error: "Answers cannot be empty.",
      });
      return;
    }

    const possibleAnswers = await prisma.answer.findMany({
      where: {
        question: {
          quizId,
        },
      },
    });

    if (possibleAnswers.length === 0) {
      res.status(404).json({
        error: "Quiz not found.",
      });
      return;
    }

    const submission = await prisma.submission.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        quiz: {
          connect: {
            id: quizId,
          },
        },
        answers: {
          connect: answers.map((answer) => ({
            id: answer,
          })),
        },
      },
    });

    await prisma.invite.update({
      where: {
        id: invite.id,
      },
      data: {
        isUsed: true,
      },
    });

    res.json(submission);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Server error. Please try again.",
    });
  }
});

exports.quizRouter = router;
