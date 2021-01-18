const Sequelize = require("sequelize");
const connection = new Sequelize("postgres://root:password@localhost/node-wsf");
//const connection = new Sequelize("mysql://user:password@localhost:3306/dbname");

connection
  .authenticate()
  .then(function () {
    console.log("connected");
  })
  .catch(function (err) {
    console.log(err);
  });

module.exports = connection;
