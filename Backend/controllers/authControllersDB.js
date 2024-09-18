import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"; 

import {pool} from '../middleware/authenticateDB.js'


const SECRET_KEY = process.env.SECRET_KEY;

//INICIO DE SESIÓN EN BASE DE DATOS
export async function loginUserDB(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email o contraseña requeridos" });
    }

    try {
        const queryText = 'SELECT * FROM public."Users" WHERE email = $1';
        const { rows } = await pool.query(queryText, [email]);

        const user = rows[0];
        if (!user) {
            return res.status(400).json({ error: "El correo no está registrado" });
        }

        // Verificar si el usuario tiene una contraseña
        if (!user.password) {
            return res.status(400).json({ error: "El usuario no ha registrado una contraseña. Por favor, regístrese primero." });
        }

        // Comparar la contraseña ingresada con la almacenada
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Email o contraseña incorrectos" });
        }

        // Generar token JWT si el login es exitoso
        const token = jwt.sign(
            { email: user.email, username: user.username, rol: user.rol},
            SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token: token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
}


//REGISTRO EN BASE DE DATOS
export async function register(req, res) {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
        return res
          .status(400)
          .json({ error: "Email, usuario y contraseña son requeridos" });
    }

    try {
        // Verificar si el usuario ya existe y si no tiene contraseña
        const checkUserQuery = 'SELECT * FROM public."Users" WHERE email = $1';
        const checkUserResult = await pool.query(checkUserQuery, [email]);

        // Si no existe el usuario, no se permite el registro
        if (checkUserResult.rows.length === 0) {
            return res.status(400).json({ error: "El correo no está registrado. El administrador debe crear primero la cuenta." });
        }

        const existingUser = checkUserResult.rows[0];

        // Verificar si el usuario ya tiene una contraseña
        if (existingUser.password) {
            return res.status(400).json({ error: "El correo ya está registrado y tiene una contraseña." });
        }

        // Encriptar la contraseña ingresada
        const hashedPassword = await bcrypt.hash(password, 10);

        // Actualizar la contraseña y el username del usuario existente
        const updateUserQuery = `UPDATE public."Users" SET password = $1, username = $2 WHERE email = $3 RETURNING email, username;`;
        const updateUserValues = [hashedPassword, username, email];

        const updatedUserResult = await pool.query(updateUserQuery, updateUserValues);
        const updatedUser = updatedUserResult.rows[0];

        res.status(201).json({
            message: "Usuario y contraseña registrados correctamente",
            user: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al registrar la contraseña y el username" });
    }
}