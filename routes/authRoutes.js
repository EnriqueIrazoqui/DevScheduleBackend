const express = require('express');
const router = express.Router();
require('dotenv').config();
const { authenticateToken } = require('../middlewares/auth');

const {
    loginUser,
    registerUser,
    profile,
  } = require("../controllers/usersController");

  /**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints relacionados con autenticación
 */


  /**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 description: Nombre del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del usuario registrado
 *                     userName:
 *                       type: string
 *       400:
 *         description: Faltan datos requeridos o usuario ya registrado
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para registrar a un usuario
router.post('/register', registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión con un usuario existente
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 description: Nombre del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id_usuario:
 *                       type: integer
 *                     userName:
 *                       type: string
 *       400:
 *         description: Faltan datos requeridos
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para conectarse
router.post('/login', loginUser);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Obtener el perfil del usuario autenticado
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del perfil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_usuario:
 *                       type: integer
 *                     userName:
 *                       type: string
 *       401:
 *         description: Token faltante o inválido
 *       404:
 *         description: Usuario no encontrado
 */

// Ruta protegida para obtener el perfil del usuario
router.get('/profile', authenticateToken, profile);

module.exports = router;