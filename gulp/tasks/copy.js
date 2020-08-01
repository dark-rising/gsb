/**
 * GSB
 * -----------------------------------------------------------------------------
 *
 * Copy files and folders.
 */
const merge = require('merge-stream');
const mode = require('gulp-mode')();
const newer = require('gulp-newer');
const through = require('through2');
const { dest, src } = require('gulp');
const { green } = require('ansi-colors');
const { relative } = require('path');
const {
  build,
  dist,
  options: {
    copy: { targets },
  },
} = require('../config');
const logger = require('../utils/logger');

const copy = () => {
  const to = mode.production() ? build : dist;
  const streams = [];

  targets.from.forEach((target) => {
    streams.push(
      src(target)
        .pipe(newer(to))
        .pipe(dest(to))
        .pipe(
          through.obj((file, enc, callback) => {
            const input = relative(process.cwd(), file.history[0]);
            const output = relative(process.cwd(), file.path);

            logger('success', `${green(input)} -> ${green(output)}`);
            callback(null, file);
          }),
        ),
    );
  });

  return merge(streams);
};

module.exports = copy;
