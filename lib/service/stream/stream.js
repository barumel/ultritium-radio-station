const Service = require('../service');
const GetHandler = require('./handler/get');

class StreamService extends Service {
  constructor() {
    super();

    this.registerHandler('GET', new GetHandler());
  }
}

module.exports = new StreamService();
