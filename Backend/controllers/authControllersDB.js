import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"; 

import {pool} from '../middleware/authenticateDB.js'


const SECRET_KEY = process.env.SECRET_KEY;

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
            return res.status(400).json({ error: "Email o contraseña incorrectos" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Email o contraseña incorrectos" });
        }

        const token = jwt.sign(
            { email: user.email, username: user.username },
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
