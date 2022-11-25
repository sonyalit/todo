const { User } = require('../db/models');

// локальные переменные
const resLocals = (req, res, next) => {
  if (req.session.adminId) {
    res.locals.userId = req.session.adminId;
  }
  res.locals.userId = req.session.userId;
  next();
};

// ищем юзера в Бд по айди
const getUser = async (req, res, next) => {
  if (res.locals.userId) {
    res.locals.user = await User.findByPk(Number(res.locals.userId), { raw: true });
  }
  next();
};

module.exports = { resLocals, getUser };
