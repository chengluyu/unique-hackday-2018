const mq = require('../libs/mq');

module.exports = {
  post: async (ctx) => {
    const file = ctx.request.body.files.file;
    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(path.join(os.tmpdir() + '/hack', Math.random().toString()));
    reader.pipe(stream);
  }
}