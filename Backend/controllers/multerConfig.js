import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ruta de la carpeta de almacenamiento
const uploadDir = path.resolve('data/uploads');

// Asegúrate de que la carpeta exista o créala
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Crea la carpeta y cualquier carpeta padre necesaria
}

// Configuración de almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Usa la ruta creada
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre único para evitar colisiones
  }
});



// Configuración de Multer
const upload = multer({
  storage: storage,
  
});

export default upload;
