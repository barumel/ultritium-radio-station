const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

var PlaylistItemSchema   = new Schema({
    source: String,
    uri: String,
    duration: Number
});

module.exports = mongoose.model('PlaylistItem', PlaylistItemSchema);
