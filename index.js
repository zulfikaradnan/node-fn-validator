const Ajv = require('ajv');
const { BadRequest } = require('@zulfikaradnan/errors');

/**
 * Plugin Validator for Engine
 * @param {array} schemas json schemas
 * @param {string} schemaId schema Id
 * @param {any} parameter parameter
 * @returns {any} if valid schema return true, else return exception errors
 */
const execute = (schemas, schemaId, parameter) => {
  try {
    const ajv = new Ajv({ schemas });
    const valid = ajv.validate(schemaId, parameter);
    if (!valid) {
      const errors = ajv.errors.map((error) => {
        return new BadRequest(error.message, error.dataPath, error.keyword);
      });
      throw errors;
    }
    return true;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  category: 'core',
  title: 'Validator',
  description: '',
  execute
};
