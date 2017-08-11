const Handler = require('../../handler');

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
