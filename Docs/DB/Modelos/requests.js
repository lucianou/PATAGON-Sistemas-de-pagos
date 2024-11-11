import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Requests = sequelize.define('Requests', {
  ID_request: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  institucion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendiente'
    
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_DATE'),
    allowNull: false,
  },
  documento_pdf: {
    type: DataTypes.BLOB('long'), // Almacena como bytea
    allowNull: true,
  },
  documento_pub: {
    type: DataTypes.BLOB('long'), // Almacena como bytea
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: "Requests",
}
);
export default Requests;