import nodemailer from 'nodemailer';

export const sendEmail = (req, res) => {
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
  };
  