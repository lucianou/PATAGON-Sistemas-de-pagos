import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import {pool} from '../middleware/authenticateDB.js'
import User from '../models/user.js';
import LoginHistory from '../models/loginHistory.js';


const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

//INICIO DE SESIÓN EN BASE DE DATOS
export async function loginUserDB(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email o contraseña requeridos" });
    }
    try {
        // Buscar el usuario por email
        const user = await User.findOne({ where: { email: email } });
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

        // Actualizar la fecha de ingreso del usuario
        user.fecha_ingreso = new Date();
        await user.save(); 

        // Generar access token (login)
        const token = jwt.sign(
            { email: user.email, username: user.username, rol: user.rol },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        // Generar Refresh Token (largo plazo)
        const refreshToken = jwt.sign(
            { email: user.email, username: user.username, rol: user.rol },
            REFRESH_SECRET_KEY,
            { expiresIn: "30d" }
        );

        // Actualizar el refresh token en el modelo de usuario
        user.refresh_token = refreshToken; 
        await user.save(); 

        // Registrar el inicio de sesión en LoginHistory
        await LoginHistory.create({
            user: user.ID, 
            login_time: new Date(), 
        });

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token: token,
            refreshToken: refreshToken,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
}


// Registro de usuario
export async function register(req, res) {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return res
            .status(400)
            .json({ error: "Email, usuario y contraseña son requeridos" });
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email: email } });

        // Si no existe el usuario, no se permite el registro
        if (!existingUser) {
            return res.status(400).json({
                error: "El correo no está registrado. El administrador debe crear primero la cuenta.",
            });
        }

        // Verificar si el usuario ya tiene una contraseña
        if (existingUser.password) {
            return res.status(400).json({
                error: "El correo ya está registrado y tiene una contraseña.",
            });
        }

        // Encriptar la contraseña ingresada
        const hashedPassword = await bcrypt.hash(password, 10);

        // Actualizar la contraseña y el username del usuario existente
        existingUser.password = hashedPassword;
        existingUser.username = username;
        await existingUser.save();

        res.status(201).json({
            message: "Usuario y contraseña registrados correctamente",
            user: { email: existingUser.email, username: existingUser.username },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar la contraseña y el username" });
    }
}