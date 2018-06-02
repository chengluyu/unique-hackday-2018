const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = (cb) => {
  db.once('open', () => {
    console.log('db connected...');
    cb();
  });
}