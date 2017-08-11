const Handler = require('../../handler');
const passport = require('passport');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

class PostHandler extends Handler {
  constructor(model) {
    super();

    this.model = model;
  }

  handle(req, res, next) {
    this.model.findOne({ username: req.body.username }, (err, result) => {
      if (err) return res.send('Invalid credentials!')

      if (result.password !== req.body.password) return res.send('Bullshit');

      const token = jwt.sign();
      // set expire
      user.token = token

      user.save();

      // Send token or user         
    });
  }
}

module.exports = PostHandler;
