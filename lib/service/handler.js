const EventEmitter = require('events');

class Handler extends EventEmitter {
  constructor() {
    super();
  }

  handle(req, res, next) {
    throw new Error('You must implement your own handle method!');
  }
}

module.exports = Handler;
