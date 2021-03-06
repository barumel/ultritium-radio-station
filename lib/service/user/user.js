const Service = require('../service');
const GetHandler = require('./handler/get');
const PostHandler = require('./handler/post');
const PutHandler = require('./handler/put');
const model = require('../../model/user');


class UserService extends Service {
  constructor() {
    super();

    this.registerHandler('GET', new GetHandler(model));
    this.registerHandler('POST', new PostHandler(model));
    this.registerHandler('PUT', new PutHandler(model));
  }
}

module.exports = new UserService();
