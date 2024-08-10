import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Membership = sequelize.define('Memberships', {
  duration: {
    type: DataTypes.STRING,
    notNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: true,
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
  slogan: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  access: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  unlimited: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  locker: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  best: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
});

export default Membership;
