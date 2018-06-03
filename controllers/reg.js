const axios = require('axios');
const recommend = require('../libs/recommend');
const UserModel = require('../models/user');
const config = require('../config').mongodb;
const schemas = require('../schemas');

async function fetchInterestTopics(shortname) {
  const fetchURL = `https://www.zhihu.com/api/v4/members/${shortname}/following-topic-contributions?include=data[*].topic.introduction`;
  try {
    const topics = [];
    while (true) {
      const { data } = await axios({
        method: 'GET',
        headers: {
          "Authorization": "oauth c3cef7c66a1843f8b3a9e6a1e3160e20"
        },
        url: fetchURL + `&offset=${topics.length}&limit=20`
      });
      topics.push(...data.data.map(x => x.topic));
      if (data.paging.is_end) {
        break;
      }
    }
    return topics;
  } catch (e) {
    console.log(e);
  }
}


module.exports = async (ctx, next) => {
  console.log(ctx.request.body);
  if (schemas.validateRegister(ctx.request.body)) {
    const { username, password, email } = ctx.request.body;
    const user = new UserModel({ username, password, userinfo: { email } });
    console.log(user);
    console.log(ctx.request.body);
    try {
      const res = await user.save();
      const topics = await fetchInterestTopics(username);
      for(const topic of topics || []) {
        console.log('like: ', topic.name);
        await recommend.liked(username, topic.id);
      }
    } catch(e) {
      const { code, errmsg } = e.toJSON();
      if(code === 11000) {
        if(errmsg.indexOf(config.username_index) !== -1) {
          ctx.state = { code: 501, data: { err: '用户已存在' } };
        } else {
          ctx.state = { code: 502, data: { err: '邮箱已存在' } };
        }
      } else {
        console.warn(e);
        ctx.state = { code: 503, data: { err: '内部错误' } };
      }
    }
  } else {
    ctx.state = { code: 504, data: { err: '非法参数' } };
  }
}
