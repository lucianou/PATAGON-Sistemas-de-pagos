import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequelize.js';

const User = sequelize.define('User', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_ingreso: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_DATE'),
    allowNull: false,
  },
  refresh_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: "Users",
}
);

export default User;
