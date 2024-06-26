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
      { username: user.username, userId: user._id },
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

router.get("/getUser", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      throw new Error("Not authenticated.");
    }
    req.userId = decodedToken.userId;
    const user = await UserService.getUserById(req.userId);

    const clientUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      allowOrders: user.allowOthersToSeePurchasedProducts,
    };

    res.status(200).json(clientUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/updateUser", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      throw new Error("Not authenticated.");
    }
    req.userId = decodedToken.userId;
    const user = await UserService.updateUser(req.userId, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
