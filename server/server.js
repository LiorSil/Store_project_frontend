const express = require("express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("./config/db.js");

const port = 5000;
const app = express();
//run firebase config
require("./config/firebase.config.js");

app.use(bodyParser.json());
//cors
app.use(cors());
app.use(cookieParser());
app.use("/favicon.ico", (req, res) => res.status(204).send());

const categoryRoutes = require("./routes/categoryRouter.js");
const orderRoutes = require("./routes/orderRouter.js");
const productRoutes = require("./routes/productRouter.js");
const userRoutes = require("./routes/userRouter.js");

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
