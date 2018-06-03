const raccoon = require('raccoon');
/*
const zhihu = require('../data/zhihu.json').slice(0, 20);
zhihu.map((user) => {
  const username = user.user.fullname;
  if(user.topics && user.topics.length > 20) {
    user.topics = user.topics.slice(0, 20);
  }
  for(const topic of user.topics || []) {
    console.log(username, topic.name);
    raccoon.liked(username, topic.id);
  }
});
*/
module.exports = {
  liked: (userid, itemid) => raccoon.liked(userid, itemid),
  mostSimilarUsers: (userid) => raccoon.mostSimilarUsers(userid),
  recommendFor: (userid) => raccoon.recommendFor(userid),
}