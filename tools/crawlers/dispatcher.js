const open = require('amqplib').connect('amqp://hack:hack@localhost/hack');


function bufferify(message) {
  return Buffer.from(JSON.stringify(message));
}

const assertQueueOptions = {
  durable: true
};

const sendQueueOptions = {
  persistent: true, contentType: 'application/json'
};

const zhihuTestData = [
  { username: 'empty', identifier: 'kai-yuan-ge' },
  { username: 'empty', identifier: 'kai-yuan-ge' },
  { username: 'empty', identifier: 'kai-yuan-ge' },
  { username: 'empty', identifier: 'kai-yuan-ge' }
];

const doubanTestData = [
  { username: 'empty', identifier: '119617402' },
  { username: 'empty', identifier: '119617402' },
  { username: 'empty', identifier: '119617402' },
  { username: 'empty', identifier: '119617402' }
];

open.then((conn) => {
  return conn.createChannel();
}).then((ch) => {
  ch.assertQueue('zhihu', assertQueueOptions).then(() => {
    for (const item of zhihuTestData) {
      ch.sendToQueue('zhihu', bufferify(item), sendQueueOptions);
      console.log('Message sent');
    }
  });
  ch.assertQueue('douban', assertQueueOptions).then(() => {
    for (const item of doubanTestData) {
      ch.sendToQueue('douban', bufferify(item), sendQueueOptions);
      console.log('Message sent');
    }
  });
}).catch(console.warn);
