const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const RedisStore = require('connect-redis')(session);
const { getConfig } = require('./lib/utils');
const runTasks = require('./lib/tasks');

const config = getConfig();

const app = express();
const db = mongoose.connect(config.mongoURI).connection;
const sessionOptions = {
  store: new RedisStore(),
  secret: config.sessionSecret,
  saveUninitialized: false,
  resave: false,
};

app.use(bodyParser.urlencoded({ extended: false }))
  .use(session(sessionOptions))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(path.join(__dirname, 'static')));

app.set('view engine', 'pug')
  .set('views', path.join(__dirname, 'views'));

require('./lib/passport')(passport);
require('./routes/admin')(app, passport);
require('./routes/widget')(app, passport);

db.once('open', () => {
  runTasks(12 * 3600 * 1000); // update weather every 12 hours
  app.listen(config.port);
  /* eslint-disable no-console */
  console.log(`Server is up and running at port ${config.port}`);
});
