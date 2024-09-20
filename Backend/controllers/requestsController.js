import { pool } from "../middleware/authenticateDB.js";

export async function requests(req, res) {
    try {
        // Consulta para obtener todas las solicitudes
        const query = 'SELECT * FROM public."Solicitudes";';
        
        // Ejecuta la consulta
        const result = await pool.query(query);
        
        // Enviar la lista de solicitudes como respuesta
        res.status(200).json(result.rows);
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al obtener las solicitudes' });
      }   
}

export async function addRequest(req, res) {
  const { nombre, email, institucion, user_id } = req.body;

  // Accede a los archivos PDF y PUB subidos
  const documento_pdf = req.files['documento_pdf'] ? req.files['documento_pdf'][0].buffer : null;
  const documento_pub = req.files['documento_pub'] ? req.files['documento_pub'][0].buffer : null;

  try {
      // Inserta la nueva solicitud en la base de datos
      const query = `
          INSERT INTO public."Requests" ("nombre", "email", "institucion", "documento_pdf", "documento_pub", "user_id", "fecha")
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *;
      `;

      const requestDate = new Date();

      const values = [nombre, email, institucion, documento_pdf, documento_pub, user_id, requestDate];
      const result = await pool.query(query, values);

      // Enviar la solicitud recién insertada como respuesta
      res.status(201).json(result.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error al guardar la solicitud' });
  }
}
