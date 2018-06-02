const request = require('request');


function makeUrl(username, limit=7) {
  return `https://www.zhihu.com/api/v4/members/${username}/activities?limit=${limit}&desktop=True`;
}


module.exports = function (username, callback) {
  request({
    method: 'GET',
    headers: {
      "Authorization": "oauth c3cef7c66a1843f8b3a9e6a1e3160e20",
      "Referer": `https://www.zhihu.com/people/${username}/activities`,
      "User-Agents": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:61.0) Gecko/20100101 Firefox/61.0"
    },
    url: makeUrl(username),
    json: true
  }, (error, response, body) => {
    if (error) {
      callback(error);
    } else if (response.statusCode != 200) {
      callback(new Error(`Bad status code ${response.statusCode}`));
    } else {
      callback(null, body);
    }
  });
}
