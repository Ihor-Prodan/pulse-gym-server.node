import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const DataCard = sequelize.define("DataCard", {
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cvv: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default DataCard;
