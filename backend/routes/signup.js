require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const express = require("express");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let { name, email, password } = req.body;

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
    res.status(500).json({
      error: "Server error. Please try again.",
    });
  }
});

exports.signUpRouter = router;
