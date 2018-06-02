const mongoose = require('mongoose');


const messageModel = mongoose.Schema({
  from: mongoose.Schema.Types.ObjectId,
  to: mongoose.Schema.Types.ObjectId,
  content: String,
  time: Date,
  read: Boolean
});

const MessageModel = mongoose.model('Message', messageModel);

module.exports = MessageModel;
