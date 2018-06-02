const mongoose = require('mongoose');

const feedSchema = mongoose.Schema({
  username: String,
  source: String,
  type: {
    type: String,
    enum: ['music', 'picture', 'githubstar', 'book', 'movie'],
  },
  content: String,
  time: Date,
});

const FeedModel = mongoose.model('Feed', feedSchema);

module.exports = FeedModel;