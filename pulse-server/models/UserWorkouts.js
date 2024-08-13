import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const UserWorkouts = sequelize.define('UserWorkouts', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  workoutId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
});

export default UserWorkouts;
