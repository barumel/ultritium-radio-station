const Handler = require('../../handler');

class DeleteHandler extends Handler {
  constructor(model) {
    super();

    this.model = model;
  }
}

module.exports = DeleteHandler;
