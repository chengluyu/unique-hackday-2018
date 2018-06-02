const mongoose = require('mongoose');
const FeedModel = require('./feed');

const UserFeedSchema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  list: [FeedModel],
});

const UserFeedModel = mongoose.model('UserFeed', UserFeedSchema);

module.exports = UserFeedModel;