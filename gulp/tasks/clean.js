/**
 * GSB
 * -----------------------------------------------------------------------------
 *
 * Delete files and folders.
 */
const del = require('del');
const { red } = require('ansi-colors');
const { relative } = require('path');
const {
  options: {
    clean: { targets },
  },
} = require('../config');
const logger = require('../utils/logger');

const clean = () => {
  return del(targets.from).then((paths) => {
    if (paths.length) {
      paths.forEach((path) => {
        logger('error', red(relative(process.cwd(), path)));
      });
    }
  });
};

module.exports = clean;
