import bcrypt from 'bcrypt';
import fs from 'fs';

// Función para registrar un usuario
export async function registerUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            email: email,
            password: hashedPassword
        };

        const usersFile = 'data/databaseUser.json';
        let users = [];

        if (fs.existsSync(usersFile)) {
            const data = fs.readFileSync(usersFile);
            users = JSON.parse(data);
        }

        users.push(user);
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
}

// Función para iniciar sesión (login)
export async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    try {
        const usersFile = 'data/databaseUser.json';
        let users = [];

        if (fs.existsSync(usersFile)) {
            const data = fs.readFileSync(usersFile);
            users = JSON.parse(data);
        } else {
            return res.status(404).json({ error: 'No hay usuarios registrados' });
        }

        const user = users.find(user => user.email === email);

        if (!user) {
            return res.status(400).json({ error: 'Email o contraseña incorrectos' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Email o contraseña incorrectos' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user: { email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
}
