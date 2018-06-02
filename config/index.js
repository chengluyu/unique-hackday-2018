const config = {
  port: '7304',
  
  mongodb: {
    url: 'mongodb://localhost:27017/hackathon',
    username_index: 'username_1',
  },

  mail: {
  }
};

module.exports = {
  ...config,
  ...(process.env.NODE_ENV === 'production' ? require('./production') : require('./development')),
}