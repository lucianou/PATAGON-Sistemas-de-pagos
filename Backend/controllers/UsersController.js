import { pool } from "../middleware/authenticateDB.js";
import { sendEmail } from "./nodeMailer.js";

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

            const updateRequestQuery = `
            UPDATE public."Requests"
            SET user_id = $1, estado = 'aceptado'
            WHERE email = $2 AND estado = 'pendiente'
            `;

            await pool.query(updateRequestQuery, [newUserId, email]);

            // Contenido del correo en caso de aceptación
            const mailOptions = {
                to: email,
                subject: `[Patagón] Respuesta solicitud de uso ${nombre}, Universidad Austral de Chile`,
                message: `Estimad@ ${nombre},

Tu solicitud fue aceptada y ya puedes usar el servicio de arriendo Patagón.

Puedes ingresar a la pagína de arriendo, para registarte: 
http://localhost:3004/api/command/register

Luego podras seleccionar la bolsa disponible de tiempo y proceder al pago.

Podrás ingresar al servidor por ssh utilizando el comando:

ssh -p 

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

export async function AllUsers(req, res) {
    try {
        // Consulta para obtener todos los usuarios
        const query = `
            SELECT email, username, rol, fecha_ingreso
            FROM public."Users"
            WHERE "rol" != 'Administrador'
            ORDER BY "fecha_ingreso" DESC NULLS LAST;
        `;
        
        // Ejecuta la consulta
        const result = await pool.query(query);
        
        // Enviar la lista de usuarios como respuesta
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }   
}

export async function deletedUser(req, res) {
    const { username, email, motivo } = req.body;
  
    if (!username || !email || !motivo) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
  
    const client = await pool.connect();
  
    try {
        await client.query('BEGIN'); // Inicia la transacción
  
        // Primero eliminar las solicitudes asociadas al usuario por el email
        const deleteRequestQuery = 'DELETE FROM public."Requests" WHERE "user_id" = (SELECT "ID" FROM public."Users" WHERE "email" = $1)';
        await client.query(deleteRequestQuery, [email]);
  
        // Eliminar el usuario de la tabla "Users"
        const deleteQuery = 'DELETE FROM public."Users" WHERE "username" = $1 AND "email" = $2';
        const deleteResult = await client.query(deleteQuery, [username, email]);
  
        if (deleteResult.rowCount === 0) {
            await client.query('ROLLBACK'); // Revertir transacción si no se encuentra el usuario
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }   
  
        // Insertar los datos en la tabla "Delete_users"
        const insertQuery = `
        INSERT INTO public."Deleted_users" ("username", "email", "motivo")
        VALUES ($1, $2, $3)
        `;
        await client.query(insertQuery, [username, email, motivo]);
  
        await client.query('COMMIT'); // Confirmar la transacción
  
        return res.status(200).json({ message: 'Usuario eliminado y registrado en Delete_users' });
        } catch (error) {
            await client.query('ROLLBACK'); // Revertir la transacción en caso de error
            console.error('Error al eliminar el usuario:', error);
            return res.status(500).json({ message: 'Error del servidor' });
        } finally {
            client.release(); // Liberar el cliente
        }
}