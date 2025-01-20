require('dotenv').config(); // Cargar las variables del archivo .env
const express = require('express');
const app = express();
const setupSwagger = require('./config/swagger');

// Cargar el archivo .env correcto dependiendo del entorno
const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env';
dotenv.config({ path: envFile });
const nodeCron = require("node-cron");

const pool = require('./config/db');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.json());

// Configurar Swagger
setupSwagger(app);
  

// Configuración del puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



// Rutas de usuario
app.use('/auth', require("./routes/authRoutes"));
