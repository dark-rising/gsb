/**
 * GSB
 * -----------------------------------------------------------------------------
 *
 * Create Browsersync server for live reloading in development mode.
 */
const bs = require('browser-sync').create('BS');
const {
  plugins: {
    browsersync: { options },
  },
} = require('../config');

const browsersync = (callback) => {
  return bs.init(options, callback);
};

module.exports = browsersync;
