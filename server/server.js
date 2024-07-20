const express = require("express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("./Configurations/db.js");

const port = 5000;
const app = express();
const cors = require("cors");
//run firebase config
require("./Configurations/firebase.config.js");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/favicon.ico", (req, res) => res.status(204).send());

const categoryRoutes = require("./Routes/CategoryRoutes");
const orderRoutes = require("./Routes/OrderRoutes");
const productRoutes = require("./Routes/ProductRoutes");
const userRoutes = require("./Routes/UserRoutes");

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//import the express module
