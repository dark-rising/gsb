/**
 * GSB
 * -----------------------------------------------------------------------------
 *
 * Main Gulp file.
 */
const { series } = require('gulp');

const browsersync = require('./gulp/tasks/browsersync');
const clean = require('./gulp/tasks/clean');
const copy = require('./gulp/tasks/copy');
const eslint = require('./gulp/tasks/eslint');
const imagemin = require('./gulp/tasks/imagemin');
const scripts = require('./gulp/tasks/scripts');
const stylelint = require('./gulp/tasks/stylelint');
const styles = require('./gulp/tasks/styles');
const templates = require('./gulp/tasks/templates');
const vendorsCSS = require('./gulp/tasks/vendors-css');
const vendorsJS = require('./gulp/tasks/vendors-js');
const watch = require('./gulp/tasks/watch');

const setProductionMode = (cb) => {
  process.env.NODE_ENV = 'production';
  cb();
};

module.exports = {
  build: series(setProductionMode, copy, imagemin, templates, scripts, styles, vendorsCSS, vendorsJS),
  default: series(clean, copy, imagemin, templates, scripts, styles, vendorsCSS, vendorsJS, browsersync, watch),
  test: series(eslint, stylelint),
};
