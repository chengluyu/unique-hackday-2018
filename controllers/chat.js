const MessageModel = require('../models/message');

module.exports = {
  async fetch(context) {
    const userID = context.session.passport.user.username;
    const unreadMessages = await MessageModel.find({
      destination: userID,
      read: false
    });
    for (const message of unreadMessages) {
      message.read = true;
      await message.save();
    }
    context.state.data = unreadMessages;
  },
  async fetchAll(context) {
    const userID = context.session.passport.user.username;
    const historyMessages = await MessageModel.find({
      destination: userID
    });
    for (const message of historyMessages) {
      if (!message.read) {
        message.read = true;
        await message.save();
      }
    }
    context.state.data = historyMessages;
  },
  async send(context) {
    const userID = context.session.passport.user.username;
    const { destination, content } = context.request.body;
    if (userID == destination) {
      context.state = { code: 300, data: { err: '不能给自己发送信息' } };
    } else {
      await MessageModel.insertMany([
        {
          from: userID,
          to: destination,
          content,
          time: Date.now(),
          read: false
        }
      ]);
    }
  }
}
