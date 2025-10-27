FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --production

COPY . .

EXPOSE 3000
CMD ["npx", "http-server", " -p", "3000", "--cors"]
