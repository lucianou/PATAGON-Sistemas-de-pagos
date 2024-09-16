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

//RRGISTRO EN BASE DATOS
export async function register(req, res) {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
        return res
          .status(400)
          .json({ error: "Email, usuario y contraseña son requeridos" });
    }

    try{
        const checkUserQuery = 'SELECT * FROM public."Users" WHERE email = $1';
        const checkUserResult = await pool.query(checkUserQuery, [email]);

        if(checkUserResult.rows.length > 0){
            return res.status(400).json({error: "El correo ya esta registrado"});
        }

        //encriptación
        const hashedPassword = await bcrypt.hash(password, 10);

        //INSERTAR NUEVO USUARIO
        const insertUserQuery = ` INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING id, email, username; `;
        const insertUserValues = [email, hashedPassword, username];



        const newUserResult = await pool.query(insertUserQuery, insertUserValues);
        const newUser = newUserResult.rows[0];

        res.status(201).json({
            message:"Usuario registrado correctamente",
            user: newUser,
        });
    } catch(error){
        console.log(error);
        res.status(500).json({error:"Erro al registrar usuario"});
    }
    
}
