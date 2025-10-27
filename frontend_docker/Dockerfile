FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./

# Instalar dependencias
RUN npm install

# Instalar http-server globalmente
RUN npm install -g http-server

COPY . .

EXPOSE 3000

# Ejecutar http-server directamente
CMD ["http-server", " -p", "3000", "--cors"]
