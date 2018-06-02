const open = require('amqplib').connect('amqp://hack:hack@localhost/hack');
const Crawlers = require('./routines');

function Worker(source, interval = 3000) {
  const queue_name = source;
  let lastFetchTime = Date.now();
  open.then((conn) => {
    return conn.createChannel();
  }).then((ch) => {
    return ch.assertQueue(queue_name, { durable: true }).then(() => {
      ch.prefetch(1);
      return ch.consume(queue_name, (data) => {
        // the fecth function
        function fetch() {
          const message = JSON.parse(data.content.toString());
          if (typeof message === 'object') {
            const { username, identifier } = message;
            Crawlers.fetch(source, identifier, (error, result) => {
              lastFetchTime = Date.now();
              ch.ack(data);
              if (error) {
                console.log(`[${source}] Crawler fetch "${identifier}" failed.`);
              } else {
                console.log(`[${source}] Crawler fetch "${identifier}" success.`);
              }
            });
          } else {
            ch.ack(data);
            console.log(`[${source}] Unexpected message in queue.`);
          }
        }
        // fetch immediately if `interval` ms since last fetch
        const timeSinceLastFetch = Date.now() - lastFetchTime;
        if (timeSinceLastFetch >= interval) {
          fetch();
        } else {
          setTimeout(fetch, interval - timeSinceLastFetch);
        }
      }); // end return
    })
  }); // end return
}

const douban = new Worker('douban');
const zhihu = new Worker('zhihu');
