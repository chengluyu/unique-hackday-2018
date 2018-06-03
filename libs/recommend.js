const raccoon = require('raccoon');

const zhihu = require('../data/zhihu.json').slice(50);
zhihu.map((user) => {
  const username = user.user.fullname;
  if(user.topics && user.topics.length > 20) {
    user.topics = user.topics.slice(20);
  }
  for(const topic of user.topics || []) {
    raccoon.liked(username, topic.id);
  }
});

module.exports = {
  liked: (userid, itemid) => raccoon.liked(userid, itemid),
  mostSimilarUsers: (userid) => raccoon.mostSimilarUsers(userid),
  recommendFor: (userid) => raccoon.recommendFor(userid),
}