# 🐳 Proyecto Microservicios con Docker Compose

> Arquitectura completa de microservicios con frontend, backend y base de datos

**Autor:** Bryan Chanona Hernández

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

---

## 📋 Tabla de Contenidos

- [Objetivo](#-objetivo)
- [Arquitectura](#-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Servicios](#-servicios)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Persistencia de Datos](#-persistencia-de-datos)

---

## 🎯 Objetivo

Diseñar e implementar una **arquitectura de microservicios** utilizando Docker Compose, integrando:

- 🌐 **Frontend Web** - Interfaz de usuario
- ⚙️ **API Backend Node.js** - Lógica de negocio
- 🗄️ **Base de Datos MySQL** - Persistencia de datos

**Conceptos aplicados:**
- Contenedores Docker
- Redes internas
- Volúmenes persistentes
- Dependencias entre servicios
- Orquestación con Docker Compose

---

## 🏗️ Arquitectura

```
┌─────────────────┐
│   Frontend      │
│   (Port 3000)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Backend API   │
│   (Port 5000)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   MySQL DB      │
│   (Port 3306)   │
└─────────────────┘
```

**Red Interna:** `internal_net`  
**Volumen Persistente:** `mysql_data_briyan`

---

## 📁 Estructura del Proyecto

```
docker-compose/
│
├── backend_docker/           # 🔧 API Backend
│   ├── src/
│   │   ├── controllers/
│   │   │   └── book.controllers.js
│   │   ├── database/
│   │   │   └── config.js
│   │   ├── domain/
│   │   └── routes/
│   │       └── book.routes.js
│   ├── .dockerignore
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── db_init/                  # 🗄️ Scripts de inicialización
│   └── init.sql
│
├── frontend_docker/          # 🌐 Frontend Web
│   ├── app.js
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── styles.css
│
├── docker-compose.yml        # 🐳 Orquestador
└── README.md                 # 📖 Documentación
```

---

## 🚀 Servicios

### 1️⃣ MySQL Database - `mysql_briyan`

| Propiedad | Valor |
|-----------|-------|
| **Imagen** | `mysql:8.0` |
| **Puerto** | `3306` |
| **Volumen** | `mysql_data_briyan` |
| **Inicialización** | `db_init/init.sql` |

**Variables de entorno:**
```env
MYSQL_ROOT_PASSWORD=123456
MYSQL_DATABASE=briyan_chanona_db
```

---

### 2️⃣ Backend API - `backend_briyan`

| Propiedad | Valor |
|-----------|-------|
| **Lenguaje** | Node.js + Express |
| **Puerto** | `5000` |
| **Dependencias** | MySQL (espera healthcheck) |

**Características:**
- ✅ API RESTful
- ✅ Conexión a base de datos
- ✅ Variables de entorno desde `.env`
- ✅ CRUD de libros

---

### 3️⃣ Frontend Web - `frontend_briyan`

| Propiedad | Valor |
|-----------|-------|
| **Tecnología** | HTML, CSS, JavaScript |
| **Servidor** | Node.js + Express |
| **Puerto** | `3000` |

**Características:**
- ✅ Interfaz de usuario responsiva
- ✅ Consume API del backend
- ✅ Visualización dinámica de datos

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Docker](https://docs.docker.com/get-docker/) (v20.10 o superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0 o superior)
- Git

---

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd docker-compose
```

### 2. Configurar variables de entorno

Asegúrate de que el archivo `backend_docker/.env` exista con las configuraciones necesarias.

---

## 🎮 Uso

### Opción 1: Levantar todos los servicios

```bash
docker-compose up -d --build
```

### Opción 2: Levantar servicios por separado

```bash
# 1. Base de datos primero
docker-compose up -d mysql_briyan

# 2. Backend (después de que DB esté healthy)
docker-compose up -d backend_briyan

# 3. Frontend (después de que backend esté listo)
docker-compose up -d frontend_briyan
```

### Verificar estado de los servicios

```bash
docker-compose ps
# o
docker ps
```

### Ver logs en tiempo real

```bash
# Todos los servicios
docker-compose logs -f

# Servicio específico
docker-compose logs -f mysql_briyan
docker-compose logs -f backend_briyan
docker-compose logs -f frontend_briyan
```

### Detener los servicios

```bash
docker-compose down
```

### Detener y eliminar volúmenes

```bash
docker-compose down -v
```

---

## 🌐 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/` | Prueba de conexión con la BD |
| `GET` | `/api/books/chanona` | Retorna nombre completo del autor |
| `GET` | `/api/books` | Obtener todos los libros |
| `POST` | `/api/books` | Crear un nuevo libro |
| `PUT` | `/api/books/:id` | Actualizar un libro |
| `DELETE` | `/api/books/:id` | Eliminar un libro |

**Ejemplo de petición:**

```bash
# Obtener todos los libros
curl http://localhost:5000/books

# Obtener nombre del autor
curl http://localhost:5000/chanona
```

---

## 💾 Persistencia de Datos

Los datos de MySQL se almacenan en un volumen Docker persistente llamado `mysql_data_briyan`. Esto significa que:

✅ Los datos sobreviven a reinicios de contenedores  
✅ Los datos persisten aunque se detengan los servicios  
✅ Los datos se eliminan solo con `docker-compose down -v`

### Probar la persistencia

```bash
# 1. Insertar datos en la base de datos
# (usando el frontend o API)

# 2. Reiniciar los contenedores
docker-compose restart mysql_briyan
docker-compose restart backend_briyan
docker-compose restart frontend_briyan

# 3. Verificar que los datos siguen ahí
# (accediendo al frontend en http://localhost:3000)
```

---

## 🌐 Acceso a los Servicios

| Servicio | URL |
|----------|-----|
| **Frontend** | http://localhost:3000 |
| **Backend API** | http://localhost:5000 |
| **MySQL** | `localhost:3306` (desde cliente MySQL) |

---

## 🛠️ Troubleshooting

### El backend no conecta con MySQL

```bash
# Verificar que MySQL esté healthy
docker-compose ps

# Ver logs de MySQL
docker-compose logs mysql_briyan

# Reintentar conexión
docker-compose restart backend_briyan
```

### Puerto ya en uso

Si algún puerto está ocupado, puedes cambiarlo en `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Cambiar el primer número
```

---

## 📝 Notas Adicionales

- 🔒 **Seguridad:** Las contraseñas en este proyecto son de ejemplo. En producción, usa variables de entorno seguras.
- 🔄 **Hot Reload:** Los cambios en el código requieren reconstruir las imágenes con `--build`.
- 🧪 **Testing:** Puedes usar herramientas como Postman o curl para probar los endpoints.

---

## 👨‍💻 Autor

**Bryan Chanona Hernández**

Si tienes preguntas o sugerencias, no dudes en contactarme.

---

## 📄 Licencia

Este proyecto es de uso educativo.

---

**¡Gracias por revisar este proyecto! 🚀**
