const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { signUpRouter } = require("./routes/signup");

const app = express();
const port = 8000;

const prisma = new PrismaClient();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials (cookies)
  })
);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (e) {
    console.log(e);
  }
});

app.use("/signup", signUpRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
