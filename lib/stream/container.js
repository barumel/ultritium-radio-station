const RadioStream = require('ultritium-radio-stream');

class StreamContainer {
  constructor() {
    this.streams = {};
  }

  create(type, id, playlist) {
    const stream = RadioStream.Stream(type, playlist);

    this.streams[id] = stream;

    return stream;
  }

  get(id) {
    return this.streams[id];
  }

  remove(id) {
    delete this.streams[id];

    return this;
  }
}

module.exports = StreamContainer;
