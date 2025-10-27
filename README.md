# Proyecto Microservicios Docker - Bryan Chanona Hernández

## Objetivo

Diseñar e implementar una arquitectura de microservicios utilizando Docker Compose, integrando un **frontend web**, una **API backend Node.js** y una **base de datos MySQL** con persistencia. Se busca comprender contenedores, redes internas, volúmenes persistentes y dependencias entre servicios.

---

## Estructura del proyecto

docker-compose/
├─ backend_docker/
│  ├─ src/
│  │  ├─ controllers/
│  │  │  └─ book.controllers.js
│  │  ├─ database/
│  │  │  └─ config.js
│  │  ├─ domain/
│  │  └─ routes/
│  │     └─ book.routes.js
│  ├─ .dockerignore
│  ├─ .env
│  ├─ Dockerfile
│  ├─ package.json
│  ├─ package-lock.json
│  └─ server.js
├─ db_init/
│  └─ init.sql
├─ frontend_docker/
│  ├─ node_modules/
│  ├─ app.js
│  ├─ Dockerfile
│  ├─ index.html
│  ├─ package.json
│  ├─ package-lock.json
│  └─ styles.css
├─ docker-compose.yml
└─ README.md

Servicios
1️ MySQL - mysql_briyan

Imagen: mysql:8.0

Puerto: 3306

Volumen persistente: mysql_data_briyan

Inicialización: scripts en db_init/init.sql

Variables:

MYSQL_ROOT_PASSWORD=123456

MYSQL_DATABASE=briyan_chanona_db

2️ Backend - backend_briyan

Lenguaje: Node.js + Express

Puerto: 5000

Variables de entorno: desde backend_docker/.env

Endpoints:

/ → prueba de conexión con la DB

/chanona → retorna tu nombre completo

/books → ejemplo de CRUD usando book.controllers.js y book.routes.js

Dependencia: espera a que MySQL esté healthy

3️ Frontend - frontend_briyan

HTML, CSS y JS estático

Servido con Node.js + Express (archivo app.js)

Puerto: 3000

Consume API del backend para mostrar datos

Redes y volúmenes

Red interna: internal_net
Todos los servicios se comunican por nombre de contenedor (mysql_briyan, backend_briyan, frontend_briyan)

Volumen MySQL: mysql_data_briyan
Asegura persistencia de datos aunque los contenedores se reinicien

Cómo levantar el entorno

Clonar el repositorio:

git clone <tu-repo>
cd docker-compose

1 Levantar todo junto
docker-compose up -d --build

2️ Levantar servicios por separado
# Base de datos
docker-compose up -d mysql_briyan

# Backend (después de que DB esté healthy)
docker-compose up -d backend_briyan

# Frontend (después de que backend esté listo)
docker-compose up -d frontend_briyan

3️ Verificar estado
docker-compose ps
docker ps

4️ Logs de servicios
docker-compose logs -f mysql_briyan
docker-compose logs -f backend_briyan
docker-compose logs -f frontend_briyan

Persistencia
Reinicia contenedores y verifica que los datos en MySQL se mantengan:

docker-compose restart mysql_briyan
docker-compose restart backend_briyan
docker-compose restart frontend_briyan
