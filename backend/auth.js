require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden" });
      }
      req.body.userId = user.id;
      req.user = user;
      next();
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Server error. Please try again.",
    });
  }
}

module.exports = { authenticate };
