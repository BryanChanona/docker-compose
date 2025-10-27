# Imagen base liviana de Node
FROM node:18-slim

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /myapp

# Copiar primero los archivos de dependencias
COPY package*.json ./

# Instalar dependencias (usa npm ci si existe package-lock.json)
RUN npm install 

# Copiar el resto del código
COPY . .

# Exponer el puerto donde corre tu backend (opcional pero buena práctica)
EXPOSE 5000

# Comando por defecto al iniciar el contenedor
CMD ["npm", "start"]
