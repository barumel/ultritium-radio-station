const Handler = require('../../handler');
const RadioStream = require('ultritium-radio-stream');

class AllHandler extends Handler {
  constructor(model) {
    super();

    this.model = model;
  }

  handle(req, res, next) {
    this.model.find((err, result) => {
      if (err) return res.send(err);

      return res.json(result);
    });
  }
}

module.exports = AllHandler;
