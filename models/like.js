const mongoose = require('mongoose');
const { feedSchema } = require('./feed')

const likeSchema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  time: Date,
  feed: feedSchema
});

const LikeSchema = mongoose.model('Like', likeSchema);

module.exports = LikeSchema;
