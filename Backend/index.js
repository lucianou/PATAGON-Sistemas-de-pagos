import express from 'express';
import cors from 'cors'
import {interactionRouter} from './routes/interactionRoute.js'
import {AuthRouter} from './routes/auth.js'

const app = express();
const port = 3006;


app.use(cors());
app.use(express.json());


//aplicación
app.use("/api/command", interactionRouter);
app.use("/api/command", AuthRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}/`);
});
