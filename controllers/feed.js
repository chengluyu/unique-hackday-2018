const UserFeedModel = require('../models/userfeed');
const recommend = require('../libs/recommend');

const topics = require('../data/zhihu-topics.json');

module.exports = {
  get: async (ctx) => {
    const { type } = ctx.params;
    if(type == 'thing') {
      const { sources, delta, limit } = ctx.query;
      
      const recs = await recommend.recommendFor(ctx.session.passport.user.username);
      const res = []
      for(const rec of recs) {
        res.append(topics[rec]);
      }

      ctx.state.data = res;
    } else if(type == 'people') {
      const { delta, limit } = ctx.query;

      const rec = await recommend.mostSimilarUsers(ctx.session.passport.user.username);

      ctx.state.data = rec;
    }
  }
}