import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Trainers = sequelize.define('Trainers', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experience: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  experiencetwo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isTop: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Trainers;
