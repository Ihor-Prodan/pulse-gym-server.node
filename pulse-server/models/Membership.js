import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Membership = sequelize.define('Membership', {
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  giveOne: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  giveTwo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  giveThree: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Membership;
