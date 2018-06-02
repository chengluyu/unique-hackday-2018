const passport = require('koa-passport');
const UserModel = require('./models/user');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  UserModel.findById(id, (err, user) => done(err, user));  
});

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy((username, password, done) => {
  UserModel.findOne({ username }, (err, user) => {
    if(err) {
      done(err);
    } else {
      if(user && password == user.password) {
        done(null, user);
      } else {
        done(null, false);
      }
    }
  });
}));

module.exports = passport;