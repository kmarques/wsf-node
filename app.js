const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const VehiculeRouter = require("./routes/vehicule");

app.use(bodyparser.json());

app.use(VehiculeRouter);

app.listen(3000);
