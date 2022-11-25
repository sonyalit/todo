require('dotenv').config();
const path = require('path');
const express = require('express');
const config = require('./config/serverConfig');
const { sequelize } = require('./db/models');
// подключить роуты

const loginRouter = require('./routes/loginRouter');
const logoutRouter = require('./routes/logoutRouter');
const todoRouter = require('./routes/todoRouter');

const app = express();
const PORT = process.env.PORT ?? 4000;
config(app);

const frontendDir = path.join(__dirname, '..', 'frontend', 'build');

app.use(express.static(frontendDir));
// запускаем роуты
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/todos', todoRouter);

app.get('*', (req, res) => res.redirect('/'));

app
  .listen(PORT)
  .on('error', (error) => console.log('Не удалось запустить веб-сервер:', error.message))
  .on('listening', () => {
    console.log('Веб-сервер слушает порт', PORT);
    sequelize
      .authenticate({ logging: false })
      .then(() => console.log('БД подключена успешно'))
      .catch((error) => console.log('Ошибка подключения к БД:', error.message));
  });
