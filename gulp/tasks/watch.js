/**
 * GSB
 * -----------------------------------------------------------------------------
 *
 * Watch files for changes in development mode and run tasks.
 */
const del = require('del');
const gulp = require('gulp');
const { red } = require('ansi-colors');
const { relative, resolve } = require('path');
const copy = require('./copy');
const imagemin = require('./imagemin');
const logger = require('../utils/logger');
const scripts = require('./scripts');
const styles = require('./styles');
const templates = require('./templates');
const vendorsCSS = require('./vendors-css');
const vendorsJS = require('./vendors-js');
const { dist, src } = require('../config');
const {
  options: {
    watch: { targets },
  },
} = require('../config');

const tasks = {
  copy,
  imagemin,
  scripts,
  styles,
  templates,
  vendorsCSS,
  vendorsJS,
};

const watch = () => {
  targets.forEach((target) => {
    const watcher = gulp.watch(target.from, gulp.series(tasks[target.task]));

    watcher.on('unlink', (filepath) => {
      let filePathFromSrc = relative(resolve(src), filepath);

      if (filePathFromSrc.includes('copy')) {
        filePathFromSrc = filePathFromSrc.replace('copy/', '');
      }

      const destFilePath = resolve(dist, filePathFromSrc);

      logger('error', red(relative(process.cwd(), destFilePath)));

      del.sync(destFilePath);
    });
  });
};

module.exports = watch;
