const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  duration: Number,
  vipcard: String,
  used: Boolean,
  usedBy: mongoose.Schema.Types.ObjectId,
});

const CardModel = mongoose.model('Card', cardSchema);

module.exports = CardModel;