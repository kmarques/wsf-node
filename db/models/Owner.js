const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Owner extends Model {}
let major = new Date();
major.setFullYear(major.getFullYear() - 18);

Owner.init(
  {
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isBefore: major.toISOString(),
      },
    },
    licenseType: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["voiture", "moto", "bateau", "avion"]],
      },
    },
  },
  {
    sequelize: db,
    modelName: "owner",
  }
);

module.exports = Owner;
