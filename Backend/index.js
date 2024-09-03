import express from 'express';
import cors from 'cors'
import {interactionRouter} from './routes/interactionRoute.js'

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());


//aplicación
app.use("/api/command", interactionRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}/`);
});
