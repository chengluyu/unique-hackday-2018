const UserFeedModel = require('../models/userfeed');

module.exports = {
  get: async (ctx) => {
    const { type } = ctx.params;
    if(type == 'thing') {
      const { sources, delta, limit } = ctx.query;
      
      const newsSet = []
      for(let source of JSON.parse(sources)) {
        const news = await UserFeedModel.find({ user: ctx.session.passport.user._id, source })
                                    .skip(delta || 0).limit(limit).sort({ time: -1 });
        if(news) {
          newsSet.splice(-1, 0, ...news);
        }
      }
      ctx.state.data = newsSet;
    } else if(type == 'people') {
      const { delta, limit } = ctx.query;
    }
  }
}