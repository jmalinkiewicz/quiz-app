require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const express = require("express");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Please enter all fields.",
      });
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists !== null) {
      return res.status(400).json({
        error: "User with this e-mail address already exists.",
      });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        console.log(err);
      }

      try {
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hash,
          },
        });

        res.status(201).json({
          message: "User created successfully.",
        });
      } catch (e) {
        res.status(500).json({
          error: "Server error. Please try again.",
        });
      }
    });
  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: "Server error. Please try again.",
    });
  }
});

exports.signUpRouter = router;
