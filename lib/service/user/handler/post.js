const Handler = require('../../handler');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

class PostHandler extends Handler {
  constructor(model) {
    super();

    this.model = model;
  }

  async handle(req, res, next) {
    const { model } = this;

    // username must be unqiue. Check for existing user with the given username
    const existing = await model.find({ username: req.body.username });
    if (!_.isEmpty(existing)) return res.json({error: `User with username ${req.body.username} already exists!`})

    // Create a new user model and set the password
    const user = new this.model(req.body);
    const { password } = user;
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;

    // Try to save the user
    try {
      let result = await user.save();
      result = result.toObject();
      // Remove password from result
      delete result.password;

      return res.json(result);
    } catch(err) {
      return res.json({error: `Error creating user: ${err}`});
    }
  }
}

module.exports = PostHandler;
