import "dotenv/config";
import pg from 'pg';


// const pool = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl:true
// })

// export { pool };



const pool = new pg.Pool({
  host: process.env.DB_HOST, // Dirección del servidor
  port: process.env.PORT,// Puerto (usualmente 5432 para PostgreSQL)
  user: process.env.DB_USER, // Usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña del usuario
  database: process.env.DB_NAME, // Nombre de la base de datos
  ssl: false // Desactiva SSL
});

export { pool };
