const middlewares = require('../lib/middlewares');
const User = require('../models/User');

module.exports = function routes(app, passport) {
  app.get('/', middlewares.Auth, (req, res) => {
    res.render('admin/index');
  });

  app.get('/login', (req, res) => {
    res.render('admin/login');
  });

  app.post('/login', (req, res) => {
    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

  app.post('/register', (req, res) => {
    const { username, password } = req.body;
    User.register(new User({ username }), password, (err) => {
      if (err) {
        return res.status(400).send('User already exists');
      }
      return passport.authenticate('local')(req, res, () => {
        res.redirect('/');
      });
    });
  });
};
