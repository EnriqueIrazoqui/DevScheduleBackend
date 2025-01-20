DevScheduleBackend
Backend para la aplicación de DevSchedule, desarrollado por el equipo MaKeR

Estructura del proyecto

DevScheduleBackend/
├── config/          # Configuración de la base de datos y variables de entorno
├── controllers/     # Lógica de los endpoints
├── middleware/      # Middleware (autenticación, autorización)
├── routes/          # Definición de las rutas de la API
├── swagger/         # Configuración para Swagger
├── package.json     # Dependencias y scripts
└── README.md        # Documentación del proyecto

Requisitos previos

    Node.js (v14 o superior)
        Descarga desde Node.js.
    MariaDB:
        Instala y configura MariaDB como tu base de datos.
    Postman (opcional):
        Úsalo para probar los endpoints de la API.
    Git:
        Asegúrate de tener Git instalado para clonar el repositorio.

Instalación

Clonar el repositorio
git clone https://github.com/usuario/DevScheduleBackend.git
cd DevScheduleBackend

Instalar dependencias

npm install

Configuración

Crea un archivo .env en la raíz del proyecto y configura las siguientes variables:
NODE_ENV=development
PORT=3308
ACCESS_TOKEN_SECRET=tu_clave_secreta_segura
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=devschedule

Ejecución

Modo de desarrollo
Inicia el servidor con Nodemon (para recargar automáticamente los cambios):
nodemon index

Modo de producción
Inicia el servidor en modo producción:
npm start

Documentación de la API
Accede a la documentación interactiva de Swagger:
http://localhost:3308/api-docs
