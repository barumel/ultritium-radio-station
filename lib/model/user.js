const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    favorites : [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
    token: String
});

module.exports = mongoose.model('User', UserSchema);
