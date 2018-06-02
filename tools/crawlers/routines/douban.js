const request = require('request');

module.exports = function (userID, callback) {
  request({
    method: 'GET',
    json: true,
    headers: {
      "Referer": "https://servicewechat.com/wx2f9b06c1de1ccfca/11/page-frame.html",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79 MicroMessenger/6.6.7 NetType/WIFI Language/zh_CN"
    },
    url: `https://m.douban.com/rexxar/api/v2/user/${userID}/interests?type=movie&status=mark&app_version=5.0.0`,
  }, (error, response, body) => {
    if (error) {
      callback(error);
    } else if (response.statusCode !== 200) {
      callback(new Error(`Bad status code ${response.statusCode}`));
    } else {
      callback(null, body);
    }
  })
};
