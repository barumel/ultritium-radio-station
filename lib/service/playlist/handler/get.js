const Handler = require('../../handler');
const RadioStream = require('ultritium-radio-stream');

class GetHandler extends Handler {
  constructor(model) {
    super();

    this.model = model;
  }

  handle(req, res, next) {
    this.model.findById(req.params.id, (err, result) => {
      if (err) return res.send(err);

      return res.json(result);
    });
  }
}

module.exports = GetHandler;
