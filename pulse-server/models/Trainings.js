import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Trainings = sequelize.define("Trainings", {
  time: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  studio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  trainer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hard: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default Trainings;
