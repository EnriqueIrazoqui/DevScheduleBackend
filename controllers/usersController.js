const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const registerUser = async (req, res) => {
  const { userName, password } = req.body;

  let conn;
  try {
      conn = await pool.getConnection();

      // Validar datos del usuario
      if (!userName || !password) {
          return res.status(400).json({
              ok: false,
              message: 'Faltan datos requeridos',
          });
      }

      // Verificar si el nombre de usuario ya está registrado
      const [existingUser] = await conn.query('SELECT * FROM users WHERE userName = ?', [userName]);

      if (Array.isArray(existingUser) && existingUser.length > 0) {
          return res.status(400).json({
              ok: false,
              message: 'El nombre de usuario ya está registrado',
          });
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertar el nuevo usuario en la base de datos
      const result = await conn.query(
          'INSERT INTO users (userName, password) VALUES (?, ?)',
          [userName, hashedPassword]
      );

      // Convertir insertId a número
      const insertId = Number(result.insertId);

      // Respuesta exitosa
      return res.status(201).json({
          ok: true,
          message: 'Usuario registrado exitosamente',
          data: {
              id: insertId,
              userName,
          },
      });
  } catch (error) {
      console.error('Error al registrar el usuario:', error);

      // Si ocurre un error, verifica si los headers ya fueron enviados
      if (!res.headersSent) {
          return res.status(500).json({
              ok: false,
              message: 'Error interno del servidor',
          });
      }

      // Si los headers ya se enviaron, solo loguea el error
  } finally {
      if (conn) conn.release(); 
  }
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body; 

  let conn;
  try {
      conn = await pool.getConnection();

      // Validar datos del usuario
      if (!userName || !password) {
          return res.status(400).json({
              ok: false,
              message: 'Faltan datos requeridos',
          });
      }

      // Obtener el usuario de la base de datos
      const [user] = await conn.query(
          `SELECT 
              id AS id_usuario, 
              userName, 
              password 
           FROM users 
           WHERE userName = ?`,
          [userName]
      );

      if (!user || user.length === 0) {
          return res.status(401).json({
              ok: false,
              message: 'Usuario no encontrado',
          });
      }

      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({
              ok: false,
              message: 'Contraseña incorrecta',
          });
      }

      // Crear un token JWT
      const token = jwt.sign(
          {
              id: user.id_usuario,
              userName: user.userName,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1h' } // El token expira en 1 hora
      );

      // Respuesta exitosa
      res.status(200).json({
          ok: true,
          message: 'Inicio de sesión exitoso',
          token,
          user: {
              id_usuario: user.id_usuario,
              userName: user.userName,
          },
      });
  } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({
          ok: false,
          message: 'Error interno del servidor',
      });
  } finally {
      if (conn) conn.release();
  }
};

const profile = async (req, res) => {
  let conn;
  try {
      conn = await pool.getConnection();

      // Obtener el nombre del usuario desde el token JWT
      const { userName } = req.user;

      // Consultar la información del usuario en la base de datos
      const [user] = await conn.query(
          'SELECT id AS id_usuario, userName FROM users WHERE userName = ?',
          [userName]
      );

      if (!user || user.length === 0) {
          return res.status(404).json({
              ok: false,
              message: 'Usuario no encontrado',
          });
      }

      // Respuesta exitosa con los datos del usuario
      res.status(200).json({
          ok: true,
          message: 'Información del perfil',
          data: user,
      });
  } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      res.status(500).json({
          ok: false,
          message: 'Error interno del servidor',
      });
  } finally {
      if (conn) conn.release();
  }
};

const logoutUser = async (req, res) => {
    try {
        res.status(200).json({
            ok: true,
            message: "Logout exitoso. Elimina el token del frontend."
        });
    } catch (error) {
        console.log("Error en el logout: ", error);
        res.status(500).json({
            ok: false,
            message: "Error interno del servidor."
        });
    }
};


  module.exports = {
    loginUser,
    registerUser,
    profile,
    logoutUser,
  };
    