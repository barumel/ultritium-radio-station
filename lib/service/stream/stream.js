const Service = require('../service');
const GetHandler = require('./handler/get');
const model = require('../../model/playlist');

class StreamService extends Service {
  constructor() {
    super();

    this.registerHandler('GET', new GetHandler(model));
  }
}

module.exports = new StreamService();
