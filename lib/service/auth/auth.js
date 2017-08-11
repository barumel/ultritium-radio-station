const Service = require('../service');
const GetHandler = require('./handler/post');
const DeleteHandler = require('./handler/delete');
const model = require('../../model/user');

class AuthService extends Service {
  constructor() {
    super();

    this.registerHandler('POST', new GetHandler(model));
    this.registerHandler('DELETE', new DeleteHandler(model));
  }
}

module.exports = new AuthService();
