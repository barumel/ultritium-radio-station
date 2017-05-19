const Handler = require('../../handler');
const RadioStream = require('ultritium-radio-stream');
const StreamHandler = require('../../../stream/handler');
const _ = require('lodash');

class GetHandler extends Handler {
  constructor() {
    super();
  }

  handle(req, res, next) {
    res.set({'Content-Type': 'audio/mpeg'});
    res.set({'Access-Control-Allow-Origin': '*'});

    const transport = RadioStream.Transport('express', res);
    const client = RadioStream.Client(transport);

    let stream = StreamHandler.get('radio', 'Super Awesom Playlist');

    if (_.isUndefined(stream)) {
      stream = StreamHandler.create('radio', 'SUper Awesom Playlist');
      const mediasource = RadioStream.Mediasource();

      stream.addMediasource('youtube', mediasource);
    }

    stream.registerClient(client);

    req.on('close', () => {
      client.stop();
      stream.unregisterClient(client);
      res.end();
    });

    stream.start();
  }
}

module.exports = GetHandler;
