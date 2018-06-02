module.exports = async (ctx) => {
  if(ctx.query) {
    const { type, source } = ctx.query;
    if(type && source) {
      
    }
  } else {
    ctx.state = { code: 100, data: { err: '' } };
  }
}