# Usa una imagen base
FROM node:16-bullseye

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 4003

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
