require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  let queriedUser;

  try {
    user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        password: true,
        name: true,
        quizzes: true,
        submissions: true,
      },
    });

    if (user !== null) {
      queriedUser = user;
    } else {
      res.status(401).json({
        error: "Invalid email or password.",
      });
      return;
    }
  } catch (e) {
    console.log(e);
  }

  if ((await bcrypt.compare(password, queriedUser.password)) === true) {
    const token = jwt.sign(
      {
        id: queriedUser.id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "4h",
      }
    );
    const { password, ...user } = queriedUser;

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        expires: new Date(new Date().getTime() + 4 * 3600000),
      })
      .json({
        message: "Logged in successfully.",
        user,
      });
  } else {
    res.status(401).json({
      error: "Invalid email or password.",
    });
  }
});

exports.logInRouter = router;
