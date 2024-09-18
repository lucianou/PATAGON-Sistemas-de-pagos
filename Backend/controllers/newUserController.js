import { pool } from "../middleware/authenticateDB.js";
import { sendEmail} from "../controllers/nodeMailer.js"

export async function newUserCreation(req, res) {
    const { email, rol, nombre } = req.body;

    try {
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

        // Actualizar la solicitud correspondiente con el nuevo usuario_id
        const updateRequestQuery = `
            UPDATE public."Requests"
            SET user_id = $1
            WHERE email = $2
        `;
        await pool.query(updateRequestQuery, [newUserId, email]);

        const mailOptions = {
            to: email,  // Enviar al email del nuevo usuario
            subject: `[Patagón] Respuesta solicitud de uso ${nombre}, Universidad Austral de Chile`,
            message: `Estimad@ ${nombre},

Tu solicitud fue aceptada y ya puedes usar el servicio de arriendo Patagón.
Puedes ingresar a la pagína de arriendo, para registarte: http://localhost:3004/api/command/register

Luego podras seleccionar la bolsa dispoible de tiempo y proceder al pago

Podrás ingresar al servidor por ssh utilizando el comando:
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

         // Llamar a la función para enviar el correo
        sendEmail(mailOptions, res);

        res.json({ message: "Usuario creado exitosamente y correo enviado", user: newUser.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
}
