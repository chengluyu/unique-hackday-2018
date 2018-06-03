const recommend = require('../libs/recommend');
const config = require('../../config').amqp;
const open = require('amqplib').connect(config.url);

const q = 'feeder';

const worker = () => {
  open.then((conn) => {
    return conn.createChannel();
  }).then((ch) => {
    return ch.assertQueue(q, { durable: true }).then(() => {
      ch.prefetch(1);
      return ch.consume(q, (data) => {
        // the fecth function
        const message = JSON.parse(data.content.toString());
        const users = recommend.mostSimilarUsers(message.username);
      }); // end return
    })
  }); // end return
}

function Worker(source, interval = 3000) {
  const queue_name = source;
  let lastFetchTime = Date.now();

}

const douban = new Worker('douban');
const zhihu = new Worker('zhihu');
