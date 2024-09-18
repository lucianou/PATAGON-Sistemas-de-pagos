import { pool } from "../middleware/authenticateDB.js";
import { sendEmail } from "../controllers/nodeMailer.js";

export async function newUserCreation(req, res) {
    const { email, rol, nombre, accion } = req.body;  // Agregar campo 'accion' para indicar si se acepta o rechaza

    try {
        if (accion === "aceptado") {
            // Verificar si el correo ya está registrado
            const checkUserQuery = 'SELECT * FROM public."Users" WHERE email = $1';
            const checkUserResult = await pool.query(checkUserQuery, [email]);

            // Si el usuario ya existe, retornar un error
            if (checkUserResult.rows.length > 0) {
                return res.status(400).json({ error: "El correo ya está registrado" });
            }

            // Insertar el nuevo usuario en la base de datos con su rol
            const newUser = await pool.query(
                `INSERT INTO public."Users" (email, rol) VALUES ($1, $2) RETURNING *`,
                [email, rol]
            );

            // Obtener el ID del nuevo usuario
            const newUserId = newUser.rows[0].ID;

            // Actualizar la solicitud correspondiente con el nuevo user_id y cambiar estado a 'aceptado'
            const updateRequestQuery = `
                UPDATE public."Requests"
                SET user_id = $1, estado = 'aceptado'
                WHERE email = $2
            `;
            await pool.query(updateRequestQuery, [newUserId, email]);

            // Contenido del correo en caso de aceptación
            const mailOptions = {
                to: email,
                subject: 'Tu solicitud ha sido aceptada - Bienvenido a Patagón',
                message: `Estimad@ ${nombre},

Tu solicitud fue aceptada y ya puedes usar Patagón.
Puedes ingresar al servidor por ssh utilizando el comando:

ssh -p 2237 lordpenguin@patagon.uach.cl

Te recomendamos revisar https://patagon.uach.cl donde encontrarás:

- Tutoriales para comenzar a usarlo.
- Estadísticas sobre el uso actual de Patagón.

Si tienes algún inconveniente o duda, puedes contactarnos a través del formulario web o respondiendo a este correo.

Saludos cordiales,

--
Supercomputador Patagón
Universidad Austral de Chile
Website: https://patagon.uach.cl
Tutorials: https://patagon.uach.cl/patagon/tutoriales
Discord: https://discord.gg/WvFTPvvWXh`
            };

            // Enviar correo de aceptación
            sendEmail(mailOptions, res);

            res.json({ message: "Usuario creado exitosamente y correo enviado", user: newUser.rows[0] });

        } else if (accion === "rechazado") {
            // Actualizar la solicitud correspondiente con el estado 'rechazado'
            const updateRequestQuery = `
                UPDATE public."Requests"
                SET estado = 'rechazado'
                WHERE email = $1
            `;
            await pool.query(updateRequestQuery, [email]);

            // Contenido del correo en caso de rechazo
            const mailOptions = {
                to: email,
                subject: 'Tu solicitud ha sido rechazada',
                message: `Estimad@ ${nombre},

Lamentamos informarte que tu solicitud para usar Patagón ha sido rechazada.
Si tienes alguna pregunta o crees que se trata de un error, puedes contactarnos respondiendo a este correo o utilizando el formulario de contacto en nuestro sitio web.

Saludos cordiales,

--
Supercomputador Patagón
Universidad Austral de Chile
Website: https://patagon.uach.cl
Tutorials: https://patagon.uach.cl/patagon/tutoriales
Discord: https://discord.gg/WvFTPvvWXh`
            };

            // Enviar correo de rechazo
            sendEmail(mailOptions, res);

            res.json({ message: "Solicitud rechazada y correo enviado" });
        } else {
            return res.status(400).json({ error: "Acción inválida. Debe ser 'aceptado' o 'rechazado'." });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error al procesar la solicitud" });
    }
}
