const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const PlaylistItem = require('./playlistitem');

var PlaylistSchema   = new Schema({
    name: String,
    items: []
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
