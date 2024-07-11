const express = require("express");
const cors = require("cors");

const app = express();
const port = 8000;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  app.use(
    cors({
      origin: "http://localhost:3000", // Be cautious in production, use specific domains instead of '*'
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true, // Allow credentials (cookies)
    })
  );

app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });