const Handler = require('../../handler');
const RadioStream = require('ultritium-radio-stream');
const StreamHandler = require('../../../stream/handler');
const _ = require('lodash');

class GetHandler extends Handler {
  constructor() {
    super();
  }

  handle(req, res, next) {
    if (_.isUndefined(req.params.playlistId)) return res.send('No playlistId provided');
    res.set({'Content-Type': 'audio/mpeg'});
    res.set({'Access-Control-Allow-Origin': '*'});

    const transport = RadioStream.Transport('express', res);
    const client = RadioStream.Client(transport);

    let stream = StreamHandler.get('radio', req.params.playlistId);

    if (_.isUndefined(stream)) {
      stream = StreamHandler.create('radio', req.params.playlistId);
      const mediasource = RadioStream.Mediasource();

      stream.addMediasource('youtube', mediasource);
    }

    stream.registerClient(client);

    stream.on('end', () => {
      StreamHandler.remove(req.params.playlistId);
    });

    req.connection.on('close', () => {
      client.stop();
      stream.unregisterClient(client);
      res.end();
    });

    stream.start();
  }
}

module.exports = GetHandler;
