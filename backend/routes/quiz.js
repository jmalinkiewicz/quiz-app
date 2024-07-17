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

exports.quizRouter = router;
