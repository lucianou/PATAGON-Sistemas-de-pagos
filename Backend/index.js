import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import { UserControlRouter } from './src/routes/userControlRoute.js';
import { AuthRouter } from './src/routes/authRoute.js';
import { RequestsRouter } from './src/routes/requestsRoute.js';
import { pool } from './src/middleware/authenticateDB.js';
import { setupSocket } from './src/controllers/socketConfig.js';
import { authenticateToken } from './src/middleware/authenticateToken.js';
import { PurchaseRouter } from './src/routes/purchase.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

const port = process.env.PORT_BACKEND;
const host = process.env.HOST;

app.use(cors());
app.use(express.json());

app.set('io', io);

app.use("/api/command", AuthRouter);
app.use("/api/command", RequestsRouter);
app.use("/api/command", UserControlRouter);
app.use("/api/command/", PurchaseRouter);

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: "Conexión establecida" });
  } catch (err) {
    res.status(500).json({ error: "error de conexion" });
  }
});

app.get('/viewPDF/:id' ,async (req, res) => {
  const requestId = req.params.id;

  try {
      const query = 'SELECT documento_pdf FROM public."Requests" WHERE "ID_request" = $1';
      const result = await pool.query(query, [requestId]);

      if (result.rows.length > 0) {
          const pdfData = result.rows[0].documento_pdf;

          // Configura las cabeceras para mostrar el PDF en el navegador
          res.setHeader('Content-Type', 'application/pdf');
          res.send(pdfData);
      } else {
          res.status(404).send('PDF no encontrado');
      }
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error al visualizar el archivo PDF' });
  }
});

app.get('/viewPUB/:id', authenticateToken, async (req, res) => {
  const requestId = req.params.id;

  try {
      const query = 'SELECT documento_pub FROM public."Requests" WHERE "ID_request" = $1';
      const result = await pool.query(query, [requestId]);

      if (result.rows.length > 0) {
          const pubData = result.rows[0].documento_pub;

          // Configura las cabeceras para mostrar el archivo .pub en el navegador
          res.setHeader('Content-Type', 'application/vnd.ms-publisher'); // MIME type para archivos .pub
          res.send(pubData);
      } else {
          res.status(404).send('Archivo .pub no encontrado');
      }
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error al visualizar el archivo .pub' });
  }
});


app.get('/api/bolsas',authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public."Bolsas"'); // Consulta para obtener todas las bolsas
    res.json(result.rows);  // Enviamos los resultados como respuesta
  } catch (error) {
    console.error('Error al obtener las bolsas:', error);
    res.status(500).json({ error: 'Error al obtener las bolsas' });
  }
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://${host}:${port}/`);
});




app.get('/api/bolsas/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM public."Bolsas" WHERE "ID" = $1', [id]); // Usa "ID" entre comillas
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Bolsa no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener los detalles de la bolsa:', error);
    res.status(500).json({ message: 'Error al obtener los detalles de la bolsa' });
  }
});
