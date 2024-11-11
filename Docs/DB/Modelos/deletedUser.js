import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequelize.js';

const DeletedUser = sequelize.define('DeletedUser', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  backup_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: true,
  },},
  {
  timestamps: false,
  tableName: "Deleted_users",
  }
);

export default DeletedUser;