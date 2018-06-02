const config = require('../../config').amqp;
const open = require('amqplib').connect(config.url);
const UserModel = require('../../models/user');

function bufferify(message) {
  return Buffer.from(JSON.stringify(message));
}

const assertQueueOptions = {
  durable: true
};

const sendQueueOptions = {
  persistent: true, contentType: 'application/json'
};

UserModel.find((error, users) => {
  console.log(`Fetched ${users.length} user(s) from database`);
  open.then((conn) => {
    return conn.createChannel();
  }).then((ch) => {
    function sendMessageFrom(source) {
      console.log(`Now begin sending message from ${source}`);
      ch.assertQueue(source, assertQueueOptions).then(() => {
        for (const user of users) {
          if (typeof user.sources[source] === 'string') {
            ch.sendToQueue(source, bufferify(item), sendQueueOptions);
            console.log('Message sent');
          }
        }
      });
    }
    sendMessageFrom('zhihu');
    sendMessageFrom('douban');
  }).catch(console.warn);
});
