const RadioStream = require('ultritium-radio-stream');

class StreamHandler {
  constructor() {
    this.streams = {};
  }

  create(type, name) {
    const playlist = this.getPlaylist(name);
    const stream = RadioStream.Stream(type, playlist);

    this.streams[name] = stream;

    return stream;
  }

  get(type, name) {
    const stream = this.streams[name];

    return stream;
  }

  getPlaylist(name) {
    const playlist = RadioStream.Playlist('Super Awesom Playlist');

    const meta = {
      id: 1,
      source: 'youtube',
      uri: 'https://www.youtube.com/watch?v=kfchvCyHmsc',
      duration: 8000
    };

    const meta2 = {
      id: 2,
      source: 'youtube',
      uri: 'https://www.youtube.com/watch?v=j1FwlQhFLQQ',
      duration: 188000
    };

    const item = RadioStream.PlaylistItem(meta);
    const item2 = RadioStream.PlaylistItem(meta2);

    playlist.add(item).add(item2);

    return playlist;
  }

  remove(name) {
    delete this.streams[name];

    return this;
  }
}

module.exports = new StreamHandler();
