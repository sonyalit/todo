const session = require('express-session');
const sessionFileStore = require('session-file-store');

const FileStore = sessionFileStore(session);

const sessionConfig = {
  store: new FileStore(),
  key: 'user_uid',
  secret: 'cookie',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

module.exports = sessionConfig;
