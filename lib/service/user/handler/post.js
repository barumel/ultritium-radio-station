const Handler = require('../../handler');
const jwt = require('jsonwebtoken');

class PostHandler extends Handler {
  constructor(model) {
    super();

    this.model = model;
  }

  handle(req, res, next) {
    const user = new this.model();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save((err) => {
      if (err) return res.send(err);

      return res.json(user);
    });
  }
}

module.exports = PostHandler;
