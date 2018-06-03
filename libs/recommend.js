const raccoon = require('raccoon');

const zhihu = require('../data/zhihu.json');
zhihu.map((user) => {
  const username = user.user.fullname;
  for(const topic of user.topics || []) {
    raccoon.liked(username, topic.url);
  }
});

module.exports = {
  liked: (userid, itemid) => raccoon.liked(userid, itemid),
  mostSimilarUsers: (userid) => raccoon.mostSimilarUsers(userid),
  recommendFor: (userid) => raccoon.recommendFor(userid),
}