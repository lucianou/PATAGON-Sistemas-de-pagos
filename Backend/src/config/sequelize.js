import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'patagon', 
  'patagon_user', 
  'MrV5ghjqzIZaoUqMJBnW7CS9j160EHom', 
  {
    host: '146.83.216.166', 
    port: 5432, 
    dialect: 'postgres', 
    logging: false,
    timezone: 'America/Santiago',
    dialectOptions: {
      // Elimina completamente la opción ssl
      useUTC: false,
    },
    ssl: false, 
  }
);

sequelize.authenticate()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch(err => console.error('Error conectando a la base de datos:', err));

export default sequelize;
