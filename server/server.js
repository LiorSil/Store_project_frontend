const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("./Configurations/db.js");

const port = 5000;
const app = express();
//run firebase config
require("./Configurations/firebase.config.js");

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/favicon.ico", (req, res) => res.status(204).send());

const userController = require("./Controllers/UserController");
const imageController = require("./Controllers/ImageController");
const productController = require("./Controllers/ProductController");
const orderController = require("./Controllers/OrderController");
const categoryController = require("./Controllers/CategoryController");
app.use("/users", userController);
app.use("/images", imageController);
app.use("/products", productController);
app.use("/orders", orderController);
app.use("/categories", categoryController);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//import the express module
