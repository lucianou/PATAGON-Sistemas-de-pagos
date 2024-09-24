# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY Backend/package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY Backend/ . 

# Expone el puerto 3003 (puedes agregar otros puertos si tu app los requiere)
EXPOSE 3003

# Comando para ejecutar nodemon en modo desarrollo (si usas nodemon)
CMD [ "npm", "run", "dev" ]
