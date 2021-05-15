const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const VehiculeRouter = require("./routes/vehicule");
const ConcessionaireRouter = require("./routes/concessionaire");
const OwnerRouter = require("./routes/owner");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use(VehiculeRouter);
app.use(ConcessionaireRouter);
app.use(OwnerRouter);

app.listen(process.env.PORT, () => console.log("server listening"));
