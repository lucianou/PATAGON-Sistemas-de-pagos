import nodemailer from 'nodemailer';

export const sendEmail = ({ to, subject, message }, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Usar la variable de entorno para el correo
          pass: process.env.EMAIL_PASS       // tu contraseña de Gmail (clave de aplicación)
        }
    });

    // Configurar el correo
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to, // Dirección del destinatario
        subject: subject, // Asunto del correo
        text: message // Mensaje del correo
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
