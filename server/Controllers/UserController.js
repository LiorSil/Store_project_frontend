const express = require("express");
const router = express.Router();
const UserService = require("../Services/UserService");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/signUp", async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await UserService.authenticateUser(req.body);
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
