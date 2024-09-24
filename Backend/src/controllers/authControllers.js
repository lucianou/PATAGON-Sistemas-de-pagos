import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import fs from "fs";
import jwt from "jsonwebtoken"; 

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;  //SECRET_KEY = "sdf8w4rfs!D@342sw4fSDF43fser!sdfw34df#%D" poner en .env

// Función para registrar usuario
export async function registerUser(req, res) {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ error: "Email, usuario y contraseña son requeridos" });
  }

  try {
    const usersFile = "data/databaseUser.json";
    let users = [];

    // Comprobar si el archivo existe y tiene contenido
    if (fs.existsSync(usersFile)) {
      const data = fs.readFileSync(usersFile, "utf-8");
      if (data.trim()) {
        users = JSON.parse(data); // Si el archivo no está vacío, parsear JSON
      }
    } else {
      // Si el archivo no existe, crearlo con un array vacío
      fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
    }

    // Verificar si el correo ya está registrado
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const user = {
      email: email,
      username: username,
      password: hashedPassword,
    };

    // Agregar el nuevo usuario a la lista
    users.push(user);

    // Guardar el archivo JSON actualizado
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
}

// Función para iniciar sesión
export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }
  try {
    const usersFile = "data/databaseUser.json";
    let users = [];

    if (fs.existsSync(usersFile)) {
      const data = fs.readFileSync(usersFile);
      users = JSON.parse(data);
    } else {
      return res.status(404).json({ error: "No hay usuarios registrados" });
    }

    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(400).json({ error: "Email o contraseña incorrectos" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Email o contraseña incorrectos" });
    }

    // Crear el token JWT
    const token = jwt.sign(
      { email: user.email, username: user.username}, // Información que se guarda en el token
      SECRET_KEY, // Llave secreta
      { expiresIn: "1h" } // Duración del token
    );

    // Devolver el token en la respuesta
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token: token, // Aquí enviamos el token al frontend
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
}
