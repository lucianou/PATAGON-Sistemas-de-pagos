import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import { UserControlRouter } from './routes/userControlRoute.js';
import { AuthRouter } from './routes/authRoute.js';
import { RequestsRouter } from './routes/requestsRoute.js';
import { pool } from './middleware/authenticateDB.js';
import { setupSocket } from './controllers/socketConfig.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

const port = 3004;

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


server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}/`);
});
