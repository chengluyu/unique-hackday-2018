const mongoose = require('mongoose');
const feedSchema = require('./feed').schema;

const UserFeedSchema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  list: [feedSchema],
});

const UserFeedModel = mongoose.model('UserFeed', UserFeedSchema);

module.exports = UserFeedModel;