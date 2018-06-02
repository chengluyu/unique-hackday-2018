const q = 'mailer-reg';

const open = require('amqplib').connect('amqp://hack:hack@localhost/hack');
let _ch = null;

module.exports = {
  open: () => {
    return open.then((conn) => conn.createChannel()).then((ch) => {
      console.log('rabbitmq connected...');
      _ch = ch;
      ch.assertQueue('face-search', { durable: true });
    }).catch(console.warn);
  },

  publish(q, msg) {
    _ch.sendToQueue(q, Buffer.from(JSON.stringify(msg)), { persistent: true, contentType: 'application/json' });
  },
}