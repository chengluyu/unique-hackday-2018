const mongoose = require('mongoose');
const { feedSchema } = require('./feed')

const commentSchema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  content: String,
  time: Date,
  feed: feedSchema
});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;
