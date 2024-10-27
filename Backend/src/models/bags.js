import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Bag = sequelize.define('Bag', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tiempo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.NUMERIC(10, 2),
    allowNull: false,
  },
  detalles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  },{
  timestamps: false,
  tableName: "Bolsas",
  }
);  

export default Bag;