const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

//Cargar variables de entorno
dotenv.config();

const port = process.env.PORT || 8080;
const app = express();
const serverName = process.env.SERVERNAME;

// Middlewares

app.use(cors())
//analiza las solicitudes entrantes con cuerpos en formato JSON
app.use(express.json())


//Ruta raiz
app.get('/raiz', (req, res) => {
  res.send(`${serverName}`)
})


app.listen(port, () => {
  console.log(`App listening on port ${port}, desde ${serverName}`)
})
