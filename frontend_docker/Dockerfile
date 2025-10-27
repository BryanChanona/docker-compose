FROM node:18-slim

WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar todas las dependencias (incluyendo dev para http-server)
RUN npm install

# Copiar el resto de la app
COPY . .

EXPOSE 3000

# Comando correcto sin espacios extra
CMD ["npx", "http-server", "-p", "3000", "--cors"]
