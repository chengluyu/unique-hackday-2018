const q = 'mailer-reg';

const open = require('amqplib').connect('amqp://panhelper:panhelper@localhost/panhelper');

let _ch = null;

module.exports = {
  open: (cb) => {
    open.then((conn) => {
      return conn.createChannel();
    }).then((ch) => {
      return ch.assertQueue(q, { durable: true }).then(() => {
        _ch = ch;
        console.log('rabbitmq connected...');
        cb();
      });
    }).catch(console.warn);
  },

  publish(msg) {
    _ch.sendToQueue(q, Buffer.from(JSON.stringify(msg)), { persistent: true, contentType: 'application/json' });
  },
}