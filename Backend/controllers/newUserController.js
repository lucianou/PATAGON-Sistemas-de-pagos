import { pool } from "../middleware/authenticateDB.js";

export async function newUserCreation(req, res) {
    const { email, rol } = req.body;

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

        res.json({ message: "Usuario creado exitosamente", user: newUser.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
}
