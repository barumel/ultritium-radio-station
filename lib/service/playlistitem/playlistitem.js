const Service = require('../service');
const PostHandler = require('./handler/post');
const model = require('../../model/playlist');


class PlaylistItemService extends Service {
  constructor() {
    super();

    this.registerHandler('POST', new PostHandler(model));
  }
}

module.exports = new PlaylistItemService();
