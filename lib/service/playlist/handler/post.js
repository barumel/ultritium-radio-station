const Handler = require('../../handler');
const RadioStream = require('ultritium-radio-stream');
const _ = require('lodash');

class PostHandler extends Handler {
  constructor(model) {
    super();

    this.model = model;
  }

  handle(req, res, next) {
    console.log(req.body);
    const playlist = new this.model();
    _.assign(playlist, req.body)

    playlist.save((err) => {
      if (err) return res.send(err);

      return res.json(playlist);
    });
  }
}

module.exports = PostHandler;
