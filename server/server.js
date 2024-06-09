const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./Configurations/db.js");

const port = 5000;
const app = express();
//run firebase config
require("./Configurations/firebase.config.js");

app.use(cors());
app.use(bodyParser.json());

//create simple get request
app.get("/api", (req, res) => {
  res.send("Hello API");
});

const userController = require("./Controllers/UserController");
const imageController = require("./Controllers/ImageController");
const productController = require("./Controllers/ProductController");
app.use("/users", userController);
app.use("/images", imageController);
app.use("/products", productController);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//import the express module
