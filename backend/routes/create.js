require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { authenticate } = require("../auth");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  const { title, description, background, content, userId } = req.body;

  try {
    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        background,
        author: {
          connect: {
            id: userId,
          },
        },
        questions: {
          create: content.map((question) => {
            return {
              text: question.question,
              answers: {
                create: question.answers.map((answer) => {
                  return {
                    text: answer.text,
                    isCorrect: answer.isCorrect,
                  };
                }),
              },
            };
          }),
        },
      },
    });

    res.json(quiz);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Server error. Please try again.",
    });
  }
});

exports.createRouter = router;
