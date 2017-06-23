function Auth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

function asyncWrapper(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

module.exports = { Auth, asyncWrapper };
