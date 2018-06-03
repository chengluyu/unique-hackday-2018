const fs = require('fs');
const zhihu = require('../data/zhihu.json');

const topics = {}

for(const user of zhihu) {
  for(const topic of user.topics || []) {
    topics[topic.id] = topic;
  }
}

fs.writeFileSync('../data/zhihu-topics.json', JSON.stringify(topics));
console.log('done');
