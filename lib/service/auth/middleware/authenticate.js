const passport = require('passport');

class AuthenticateMiddleware {
  constructor() {

  }

  handle() {
    return (req, res, next) => {
      return passport.authenticate('bearer', { session: false });
     //return next();
    };
  }
}

module.exports = new AuthenticateMiddleware();
