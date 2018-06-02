const Ajv = require('ajv');
const ajv = new Ajv();

const loadSchema = (filename) => ajv.compile(require(filename));

module.exports = {
  validateRegister: loadSchema('./register.json')
};
