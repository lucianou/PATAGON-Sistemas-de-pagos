import "dotenv/config";
import pg from 'pg';


// const pool = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl:true
// })

// export { pool };



const pool = new pg.Pool({
  host: "146.83.216.166", // Dirección del servidor
  port: 5432, // Puerto (usualmente 5432 para PostgreSQL)
  user: "patagon_user", // Usuario de la base de datos
  password: "MrV5ghjqzIZaoUqMJBnW7CS9j160EHom", // Contraseña del usuario
  database: "patagon", // Nombre de la base de datos
  ssl: false // Desactiva SSL
});

export { pool };
