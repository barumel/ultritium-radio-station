const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const _ = require('lodash');

var PlaylistSchema   = new Schema({
    title: String,
    description: String,
    genre: String,
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }]
}, {
  timestamps: true
});


PlaylistSchema.statics.search = (value) => {
  const model = mongoose.model('Playlist');
  return model.find({title: new RegExp(value, 'i')});
}

PlaylistSchema.statics.recent = () => {
  const model = mongoose.model('Playlist');
  return model.find({}).sort({createdAt: -1}).limit(6).exec();
}

PlaylistSchema.statics.popular = () => {
  return model.find({}).limit(6).exec();
}

module.exports = mongoose.model('Playlist', PlaylistSchema);
