const mongoose = require('mongoose');
const interestSchema = require('./interest').schema;

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  userinfo: { 
    email: String, 
    gender: String, 
    nickname: String,
    biography: String,
    birthday: String,
  },
  interest: {
    zhihu: {
      topics: [interestSchema],
    },
    douban: {
      books: [interestSchema],
      movies: [interestSchema],
    },
  },
  sources: Object
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
