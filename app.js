const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const VehiculeRouter = require("./routes/vehicule");
const cors = require("cors");

app.use(bodyparser.json());
//app.use(cors());

app.use(VehiculeRouter);

app.listen(3009);
