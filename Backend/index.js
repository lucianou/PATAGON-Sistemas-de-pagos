import express from 'express';
import cors from 'cors'
import {interactionRouter} from './routes/interactionRoute.js'
import {AuthRouter} from './routes/auth.js'
import { pool } from './middleware/authenticateDB.js';


const app = express();
const port = 3004;


app.use(cors());
app.use(express.json());


//aplicación
app.use("/api/command", interactionRouter);
app.use("/api/command", AuthRouter);

// prueba de conexión base de datos
app.get('/test-db', async (req, res) => {
  try{
    const result = await pool.query('SELECT NOW()' );
    res.json({ message: "Conexión establecida"})
  }catch(err){
    res.status(500).json({error: "error de conexion"});
  }
});



app.post('/api/solicitudes', async (req, res) => {
  const { nombre, email, institucion, documento_pdf, documento_pub } = req.body;

  try {
    // Insertar la nueva solicitud en la base de datos
    const query = `
  INSERT INTO public."Solicitudes" ("nombre", "email", "institucion", "documento_pdf", "documento_pub")
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
`;

    const values = [nombre, email, institucion , documento_pdf, documento_pub];

    const result = await pool.query(query, values);

    // Enviar la solicitud recién insertada como respuesta
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al guardar la solicitud' });
  }
});


// Ruta para obtener todas las solicitudes
app.get('/api/solicitudes', async (req, res) => {
  try {
    // Consulta para obtener todas las solicitudes
    const query = 'SELECT * FROM public."Solicitudes";';
    
    // Ejecuta la consulta
    const result = await pool.query(query);
    
    // Enviar la lista de solicitudes como respuesta
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al obtener las solicitudes' });
  }
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}/`);
});
