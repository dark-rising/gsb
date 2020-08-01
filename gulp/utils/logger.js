/**
 * GSB
 * -----------------------------------------------------------------------------
 */
const { asString } = require('date-format');
const { gray } = require('ansi-colors');
const { Signale } = require('signale');

/**
 * -----------------------------------------------------------------------------
 * Console logger
 * -----------------------------------------------------------------------------
 *
 * @param {('success', 'error')} type
 * @param {string} message
 * @returns {*}
 */
const logger = (type, message) => {
  const time = `[${gray(asString('hh:mm:ss', new Date()))}]`;

  const console = new Signale({
    types: {
      [type]: {
        label: '',
      },
    },
  });

  return console[type]({
    message,
    prefix: time,
  });
};

module.exports = logger;
