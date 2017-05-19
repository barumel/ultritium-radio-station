const Service = require('../service');
const AllHandler = require('./handler/all');
const GetHandler = require('./handler/get');
const PostHandler = require('./handler/post');
const model = require('../../model/playlist');


class PlaylistService extends Service {
  constructor() {
    super();

    this.registerHandler('ALL', new AllHandler(model));
    this.registerHandler('GET', new GetHandler(model));
    this.registerHandler('POST', new PostHandler(model));
  }
}

module.exports = new PlaylistService();
