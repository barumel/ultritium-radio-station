const Handler = require('../../handler');
const RadioStream = require('ultritium-radio-stream');
const StreamHandler = require('../../../stream/handler');
const StreamContainer = require('../../../stream/container');
const _ = require('lodash');

class GetHandler extends Handler {
  constructor(model) {
    super();

    this.model = model;
    this.containers = {
      radio: new StreamContainer(),
      individual: new StreamContainer()
    };
  }

  handle(req, res, next) {
    if (_.isUndefined(req.params.type)) return res.send('No stream type provided!')
    if (_.isUndefined(req.params.playlistId)) return res.send('No playlistId provided!');
    if (_.isUndefined(this.containers[req.params.type])) res.send(`Stream of type ${req.params.type} not available!`);

    this.model.findById(req.params.playlistId, (err, result) => {
      if (err) return res.send(err);
      if (_.isUndefined(result)) return res.send(`No playlist with id ${req.params.id} found!`)

      const items = result.items.map((item) => RadioStream.PlaylistItem(item));
      const playlist = RadioStream.Playlist(result.toObject(), items);

      const container = this.containers[req.params.type];

      res.set({'Content-Type': 'audio/mpeg'});
      res.set({'Access-Control-Allow-Origin': '*'});

      const transport = RadioStream.Transport('express', res);
      const client = RadioStream.Client(transport);

      const identifier = req.params.playlistId;

      // If its an individual stream, use client id as identifier
      if (req.params.type === 'individual') {
        identifier = client.id;
      }

      let stream = container.get(identifier);

      if (_.isUndefined(stream)) {
        stream = container.create(req.params.type, identifier, playlist);
        const mediasource = RadioStream.Mediasource();

        stream.addMediasource('youtube', mediasource);
      }

      stream.registerClient(client);

      stream.on('end', () => {
        container.remove(identifier);
      });

      req.connection.on('close', () => {
        client.stop();
        stream.unregisterClient(client);
        res.end();
      });

      stream.start();
    });
  }
}

module.exports = GetHandler;
