import multer from 'multer';

// Configuración de multer para almacenar archivos en memoria
const storage = multer.memoryStorage(); // Almacena los archivos en memoria como Buffer
const upload = multer({ storage: storage });

// Exportar upload como exportación por defecto
export default upload;
