const Handler = require('../../handler');
const passport = require('passport');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// Move this to config!!!
const SECRET = 'hallowelt';

class PostHandler extends Handler {
  constructor(model) {
    super();

    this.model = model;
  }

  async handle(req, res, next) {
    const { model } = this;
    const { username, password } = req.body;

    // Try to find a user with the given username
    const user = await model.findOne({username: username});
    if (!user) return res.json({error: `Username or password incorrect!`});

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({error: `Username or password incorrect!`});

    user.token = await jwt.sign({username: username}, SECRET);

    let result = await user.save();
    result = result.toObject();
    delete result.password;

    return res.json(result);
  }
}

module.exports = PostHandler;
