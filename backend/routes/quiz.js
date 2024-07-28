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
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json(quizzes);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Server error. Please try again.",
    });
  }
});

router.get("/created", authenticate, async (req, res) => {
  try {
    const { userId } = req.body;

    const quizzes = await prisma.quiz.findMany({
      where: {
        authorId: userId,
      },
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
        submissions: true,
      },
    });
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

router.get("/results/:quizId", authenticate, async (req, res) => {
  try {
    const { quizId } = req.params;
    const { userId } = req.body;

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

    const submissions = await prisma.submission.findMany({
      where: {
        quizId,
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        answers: true,
        quizId: true,
      },
    });

    res.json(submissions);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Server error. Please try again.",
    });
  }
});

exports.quizRouter = router;
