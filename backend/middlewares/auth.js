const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    const message = 'В Cookies нет jwt-токена';
    next(new UnauthorizedError(message));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    const message = `Невалидный jwt-токен в Cookies. jwt-токен: ${token}`;
    next(new UnauthorizedError(message));
  }
  req.user = payload;

  next();
};
