const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  userinfo: {
    email: String,
    vipExpireDate: { type: Date, default: Date.now },
  },
  activated: { type: Boolean, default: false },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;