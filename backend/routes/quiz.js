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
    const creatorMode = req.query.creatorMode;

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
                isCorrect: creatorMode === "y" ? true : false,
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

    if (invite === null && creatorMode !== "y") {
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
          create: answers.map((answer) => {
            return {
              answer: {
                connect: {
                  id: answer,
                },
              },
            };
          }),
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

    res.status(200).json(submission);
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
        answers: {
          select: {
            answerId: true,
          },
        },
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

router.get("/submission/:submissionId", authenticate, async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { userId } = req.body;

    const submission = await prisma.submission.findUnique({
      where: {
        id: submissionId,
      },
      select: {
        user: {
          select: {
            name: true,
          },
        },
        quiz: {
          select: {
            authorId: true,
          },
        },
        answers: {
          select: {
            answerId: true,
          },
        },
      },
    });

    if (submission === null) {
      res.status(404).json({
        error: "Submission not found.",
      });
      return;
    }

    if (submission.quiz.authorId !== userId) {
      res.status(403).json({
        error: "You are not authorized to view this submission.",
      });
      return;
    }

    res.json(submission);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Server error. Please try again.",
    });
  }
});

router.get("/:quizId", authenticate, async (req, res) => {
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
        authorId: true,
        author: {
          select: {
            name: true,
          },
        },
        submissions: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
            answers: {
              select: {
                answerId: true,
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

    if (quiz.authorId !== userId) {
      delete quiz.submissions;
    }

    res.json(quiz);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Server error. Please try again.",
    });
  }
});

router.delete("/:quizId", authenticate, async (req, res) => {
  try {
    const { quizId } = req.params;
    const { userId } = req.body;

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
    });

    if (quiz === null) {
      res.status(404).json({
        error: "Quiz not found.",
      });
      return;
    }

    if (quiz.authorId !== userId) {
      res.status(403).json({
        error: "You are not authorized to delete this quiz.",
      });
      return;
    }

    await prisma.invite.deleteMany({
      where: {
        quizId,
      },
    });

    await prisma.answer.deleteMany({
      where: {
        question: {
          quizId,
        },
      },
    });

    await prisma.question.deleteMany({
      where: {
        quizId,
      },
    });

    await prisma.quiz.delete({
      where: {
        id: quizId,
      },
    });

    res.status(200).json({
      message: "Quiz deleted.",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Server error. Please try again.",
    });
  }
});

exports.quizRouter = router;
