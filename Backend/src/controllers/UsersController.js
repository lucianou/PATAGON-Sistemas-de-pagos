import { Op } from "sequelize";
import { pool } from "../middleware/authenticateDB.js";
import { sendEmail } from "./nodeMailer.js";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import DeletedUser from "../models/deletedUser.js";
import sequelize from "../config/sequelize.js";
import Requests from "../models/requests.js";
import LoginHistory from "../models/loginHistory.js";


//Usuarios con roles administrativos
export async function getAdminsRole(req, res) {
    try {
        const admins = await User.findAll({
            where: { rol: { [Op.not]: 'Cliente' } },
            order: [['fecha_ingreso', 'DESC NULLS LAST']],
        });

        // Formatea la fecha_ingreso en cada objeto admin
        const formattedAdmins = admins.map(admin => {
            const formattedDate = admin.fecha_ingreso
                ? new Date(admin.fecha_ingreso).toISOString().slice(2, 10) // Obtiene 'yy-mm-dd'
                : null; 
            return {
                ...admin.toJSON(), 
                fecha_ingreso: formattedDate,
            };
        });

        res.json(formattedAdmins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los administradores' });
    }
}


//Insertar usuario con rol administrativo
export async function insertUserRole(req, res) {
    const { email, nombre, password, rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }

        // Insertar el nuevo usuario
        const newUser = await User.create({
            email: email,
            nombre: nombre,
            password: hashedPassword,
            rol: rol
        });
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al insertar usuario" });
    }
}


export async function newUserCreation(req, res) {
    const { email, nombre, accion, comentario} = req.body;  // Agregar campo 'accion' para indicar si se acepta o rechaza

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
            const rol = 'Cliente'; 
            const newUser = await pool.query(
                `INSERT INTO public."Users" (email, nombre, rol) VALUES ($1, $2, $3) RETURNING *`,
                [email, nombre, rol]
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

${comentario}

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

Motivo: ${comentario}
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


//Obtener todos los usuarios
export async function AllUsers(req, res) {
    try {
        const users1 = await User.findAll({
            attributes: ['email', 'username', 'rol', 'fecha_ingreso', 'nombre'],
            where: { rol: 'Cliente' },
            order: [['fecha_ingreso', 'DESC NULLS LAST']],
        });

        const users = users1.map(user => ({
            ...user.toJSON(),
            fecha_ingreso: user.fecha_ingreso ? user.fecha_ingreso.toISOString().split('T')[0] : null,
          }));

        // Consulta para obtener todos los usuarios eliminados
        const deletedUsers = await DeletedUser.findAll();
        res.status(200).json({ users, deletedUsers });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}


//deleteUser usando sequelize
export async function deletedUser(req, res) {
    const { nombre, email, motivo } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'El email es requerido' });
    }

    try {
        // Encontrar al usuario por email
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Desvincular todas las solicitudes relacionadas
        await Requests.update(
            { user_id: null },  
            {
                where: {
                    user_id: user.ID,
                    estado: 'aceptado'  
                }
            }
        );

        // Desvincular todos los registros en LoginHistory
        await LoginHistory.update(
            { user: null },  
            {
                where: { user: user.ID }
            }
        );

        // Guardar el usuario eliminado en Deleted_users
        await DeletedUser.create({
            username: user.username,
            nombre: user.nombre,
            email: user.email,
            motivo: motivo,
            backup_id: user.ID
        });

        // Eliminar al usuario
        await user.destroy();
        
        return res.status(200).json({ message: 'Usuario eliminado y registrado en Deleted_users' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        return res.status(500).json({ message: 'Error del servidor' });
    }
}