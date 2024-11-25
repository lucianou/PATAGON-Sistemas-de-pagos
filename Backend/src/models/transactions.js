import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Orders = sequelize.define('Orders', {
  order_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.NUMERIC(10, 2),
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  },{
    timestamps: false,
    tableName: "Orders",
  }
);

export default Orders;