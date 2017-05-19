const EventEmitter = require('events');

class Service extends EventEmitter {
  constructor() {
    super();

    this.handlers = {};
  }

  registerHandler(method, handler) {
    this.handlers[method] = handler;

    return this;
  }

  unregisterHandler(method) {
    delete this.handlers[path];

    return this;
  }

  handle(method, req, res, next) {
    const handler = this.handlers[method];

    return handler.handle(req, res, next);
  }
}

module.exports = Service;
