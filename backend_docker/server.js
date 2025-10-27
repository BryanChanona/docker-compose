const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const booksRoutes = require('./src/routes/book.routes.js')
//Cargar variables de entorno
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// Middlewares

app.use(cors())
//analiza las solicitudes entrantes con cuerpos en formato JSON
app.use(express.json())


//Ruta raiz
app.get('/api/books/Chanona', (req, res) => {
  res.send('Briyan de Jesús Chanona Hernández')
})
//Rutas
app.use('/api/books',booksRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
