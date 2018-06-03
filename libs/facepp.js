const axios = require('axios');

module.exports = {
  search: async (image_file) => {
    const res = await axios.post('https://api-cn.faceplusplus.com/facepp/v3/search', {
      api_key: 'hmASn3exFc2bB_OGnLI4FvlxWZSFDDYR',
      api_secret: 'Ko-Aog1VWb55ef2DI7q1K7sYDSCcq_AQ',
      image_file,
    });
  }
}