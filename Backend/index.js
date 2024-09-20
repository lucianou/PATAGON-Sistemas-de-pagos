import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import http from 'http';

import {UserControlRouter} from './routes/userControlRoute.js'
import {AuthRouter} from './routes/authRoute.js'
import { RequestsRouter } from './routes/requestsRoute.js';
import { configureSocket } from './controllers/socketConfig.js';
import { addSocketIo } from './middleware/socketMiddleware.js';


dotenv.config();
const app = express();
const port = 3004;

//socket notificaciones
const server = http.createServer(app);
const io = configureSocket(server);

app.use(cors());
app.use(express.json());


//aplicación
app.use("/api/command", AuthRouter);
app.use("/api/command", addSocketIo(io), RequestsRouter);
app.use("/api/command", UserControlRouter);



server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}/`);
});
