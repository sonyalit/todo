const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const sessionConfig = require('./sessionConfig');
const { getUser, resLocals } = require('../middleware/ssr');

function config(app) {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(session(sessionConfig));
  app.use(resLocals);
  app.use(getUser);
}
module.exports = config;
