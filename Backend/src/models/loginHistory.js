import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequelize.js';

const LoginHistory = sequelize.define('LoginHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  login_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: "LoginHistory",
}
);

export default LoginHistory;


