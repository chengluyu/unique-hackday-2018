const nodemailer = require('nodemailer');
const config = require('../config').mail;

const transport = nodemailer.createTransport({
  host: config.host,
  port: config.port,
  sercure: true,
  auth: config.auth,
}, { from: config.from });

const q = 'mailer-reg';
const open = require('amqplib').connect('amqp://hack:hack@localhost/hack');

open.then((conn) => {
  return conn.createChannel();
}).then((ch) => {
  return ch.assertQueue(q, { durable: true }).then(() => {
    ch.prefetch(1);
    return ch.consume(q, (data) => {
      if(data !== null) {
        const msg = JSON.parse(data.content.toString());
        const { token, username, email, count } = msg;
        const activateUrl = `https://api.mllab.cn/panhelper/api/v1/activate?token=${token}`;

        transport.sendMail({
          to: email,
          subject: '',
          html: ``,
        }).then(res => {
          console.log(`Delivered message ${res.messageId} -- token: ${email}`);
          return ch.ack(data);
        }).catch((e) => {
          console.warn(e);
          ch.ack(data);
          if(count > 4) {
            console.error(`[FAILED]: ${token} ${email}`);
          } else {
            ch.sendToQueue(q, Buffer.from(JSON.stringify({ token, username, password, count: count === undefined ? 1 : count + 1 })), { persistent: true, contentType: 'application/json' })
          }
        });
      }
    })
  })
});