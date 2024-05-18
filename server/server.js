const express = require("express");
const cors = require("cors");
require("./Configurations/db.js");

const port = 5000;
const app = express();

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//create simple get request


app.get("/api", (req, res) => {
  res.send("Hello API");
});

//import the express module
