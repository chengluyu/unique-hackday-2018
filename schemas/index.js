const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');


const ajv = new Ajv();

function loadSchema(filename) {
  const content = fs.readFileSync(path.join(__dirname, filename), 'utf-8');
  return ajv.compile(JSON.parse(content));
}

module.exports = {
  validateRegister: loadSchema('register.json')
};
