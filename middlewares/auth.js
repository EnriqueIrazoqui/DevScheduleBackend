const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log('Usuario autenticado:', req.user); // Log adicional
    next();
  });
};


const authorizeRoles = (roles) => async (req, res, next) => {
  if (!req.user || !req.user.rol_descripcion) {
    return res.status(403).json({ message: 'Acceso denegado: rol de usuario no encontrado' });
  }

  try {
    const userRole = req.user.rol_descripcion;

    if (roles.includes(userRole)) {
      next();
    } else {
      return res.status(403).json({ message: 'Acceso denegado: permisos insuficientes' });
    }
  } catch (error) {
    console.error('Error al autorizar roles:', error);
    return res.status(500).json({ message: 'Error Interno del Servidor' });
  }
};


module.exports = { authenticateToken, authorizeRoles };
