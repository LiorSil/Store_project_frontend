const express = require("express");
const router = express.Router();
const UserService = require("../Services/UserService");
router.post("/", async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
