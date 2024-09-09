import { Connection } from "mysqlo2/promise";
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data', '../data/databaseUser.json'); // Ubicación del archivo JSON

export async function searchUser(req, res) {
  try {
    const { name, password } = req.body;

    // Valida los datos recibidos
    if (!name || !password) {
      return res.status(400).send("Faltan datos requeridos: correo o nombre");
    }
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          return res.status(200).json([]);
        } else {
          console.error("Error al leer el archivo:", err);
          return res.status(500).send("Error al procesar la solicitud");
        }
      }
      try {
        const requests = JSON.parse(data);
        res.status(200).json(requests);
      } catch (parseError) {
        console.error("Error al parsear el archivo JSON:", parseError);
        res.status(500).send("Error al procesar la solicitud");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de solicitud");
  }
}