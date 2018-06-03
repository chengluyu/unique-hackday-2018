const mongoose = require('mongoose');

const interestSchema = mongoose.Schema({
  source: String,
  name: String,
});

const InterestModel = mongoose.model('Interest', interestSchema);

module.exports = {
  schema: interestSchema,
  model: InterestModel,
};