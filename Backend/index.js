import express from 'express';
import cors from 'cors'
import {interactionRouter} from './routes/interactionRoute.js'
import {AuthRouter} from './routes/auth.js'
import { pool } from './middleware/authenticateDB.js';
import nodemailer from 'nodemailer';

const app = express();
const port = 3002;


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

app.post('/send-email', (req, res) => {
  // Configuración del transporter con Gmail (puedes usar otros servicios)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ferna.cast0607@gmail.com', // tu correo
      pass: 'nwwa rizc kxws hojs'        // tu contraseña de Gmail
    }
  });

  // Configurar el correo
  const mailOptions = {
    from: 'ferna.cast0607@gmail.com',
    to: req.body.to, // Dirección del destinatario que puedes pasar en el cuerpo de la solicitud
    subject: req.body.subject, // Asunto que se pasa en el cuerpo de la solicitud
    text: req.body.message // Mensaje que se pasa en el cuerpo de la solicitud
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado: ' + info.response);
      return res.status(200).send('Correo enviado exitosamente');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}/`);
});
