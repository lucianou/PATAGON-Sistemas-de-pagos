# Usa una imagen base de Node.js
FROM node:16-bullseye

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto que has definido en vite.config.js
EXPOSE 4003

# Comando para ejecutar Vite
CMD ["npm", "run", "dev"]
