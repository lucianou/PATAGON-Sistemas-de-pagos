import { pool } from "../middleware/authenticateDB.js";
import Resquests from '../models/requests.js';


export async function requests(req, res) {
  try {
    const requests = await Resquests.findAll({
      attributes: ['ID_request', 'nombre', 'email', 'institucion', 'estado', 'fecha'],
    });

    res.status(200).json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al obtener las solicitudes' });
  }
}




export async function addRequest(req, res) {
  const { nombre, email, institucion, user_id } = req.body;

  const documento_pdf = req.files['documento_pdf'] ? req.files['documento_pdf'][0].buffer : null;
  const documento_pub = req.files['documento_pub'] ? req.files['documento_pub'][0].buffer : null;

  try {
    const requestDate = new Date();

    const newRequest = await Resquests.create({
      nombre,
      email,
      institucion,
      documento_pdf,
      documento_pub,
      user_id: null, 
      estado: 'pendiente',
      fecha: requestDate,
    });

    req.app.get('io').emit('newRequest', newRequest);
    res.status(201).json(newRequest);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al guardar la solicitud' });
  }
}
