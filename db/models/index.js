const db = require("../db");

const Vehicule = require("./Vehicule");
const Concessionaire = require("./Concessionaire");

db.sync({
  alter: true,
})
  .then(() => console.log("database updated"))
  .catch(() => console.log("database update failed"));

module.exports = {
  Vehicule,
  Concessionaire,
};
