const Handler = require('../../handler');
const _ = require('lodash');

class PostHandler extends Handler {
  constructor(model) {
    super();

    this.model = model;
  }

  handle(req, res, next) {
    if (_.isUndefined(req.body.playlist)) return res.send('No playlist provided');
    const playlist = this.model.findById(req.body.playlist, (err, result) => {
      if (err) return res.send(err);
      if (!result) return res.send('No playlist with id ' + req.body.playlist + ' found!')

      const item = {
        name: req.body.name,
        source: req.body.source,
        uri: req.body.uri,
        duration: req.body.duration
      };

      result.items.push(item);

      result.save((err) => {
        if (err) return res.send(err);

        return res.json(item);
      });
    });
  }
}

module.exports = PostHandler;
