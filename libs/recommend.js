const raccoon = require('raccoon');

module.exports = {
  liked: (userid, itemid) => raccoon.liked(userid, itemid),
  mostSimilarUsers: (userid) => raccoon.mostSimilarUsers(userid),
}