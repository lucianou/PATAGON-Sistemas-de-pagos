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

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: "Conexión establecida" });
  } catch (err) {
    res.status(500).json({ error: "error de conexion" });
  }
});

app.get('/viewPDF/:id', async (req, res) => {
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


server.listen(port, () => {
  console.log(`Servidor escuchando en http://${host}:${port}/`);
});
