const mongoose = require('mongoose');

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
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;