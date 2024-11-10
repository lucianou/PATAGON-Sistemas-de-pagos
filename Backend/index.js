import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';

import { UserControlRouter } from './src/routes/userControlRoute.js';
import { AuthRouter } from './src/routes/authRoute.js';
import { RequestsRouter } from './src/routes/requestsRoute.js';
import { setupSocket } from './src/config/socketConfig.js';
import { PurchaseRouter } from './src/routes/purchase.js';
import { StatisticsRouter } from './src/routes/statisticsRoute.js';
import { ProductsRouter } from './src/routes/productsRoute.js';
import { FilesRouter } from './src/routes/filesRoute.js';

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
app.use("/api/command/", StatisticsRouter);
app.use("/api/command/", ProductsRouter);
app.use("/api/command/", FilesRouter);



server.listen(port, () => {
  console.log(`Servidor escuchando en http://${host}:${port}/`);
});
