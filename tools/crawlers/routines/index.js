const crawlers = new Map([
  ["zhihu", require("./zhihu")],
  // ["netease-music", require("./netease-music")],
  ["douban", require("./douban")]
]);


module.exports = {
  fetch(source, identifier, callback) {
    const crawler = crawlers.get(source);
    if (typeof crawler === 'function') {
      crawler(identifier, callback);
    } else {
      callback(new Error(`No crawler for "${source}"`))
    }
  }
};
