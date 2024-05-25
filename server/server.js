const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./Configurations/db.js");

const port = 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

//create simple get request
app.get("/api", (req, res) => {
  res.send("Hello API");
});

const userController = require("./Controllers/UserController");
app.use("/users", userController);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//import the express module
