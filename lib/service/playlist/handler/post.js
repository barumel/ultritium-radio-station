const Handler = require('../../handler');
const RadioStream = require('ultritium-radio-stream');

class PostHandler extends Handler {
  constructor(model) {
    super();

    this.model = model;
  }

  handle(req, res, next) {
    const playlist = new this.model();
    playlist.name = 'My Super Awesom Playlist';
    playlist.items = [];

    playlist.save((err) => {
      if (err) return res.send(err);

      return res.json(playlist);
    });
  }
}

module.exports = PostHandler;
