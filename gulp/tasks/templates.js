/**
 * GSB
 * -----------------------------------------------------------------------------
 *
 * Compile njk files to html.
 */
const bs = require('browser-sync').get('BS');
const data = require('gulp-data');
const fs = require('fs');
const gulpif = require('gulp-if');
const mode = require('gulp-mode')();
const nunjucksRender = require('gulp-nunjucks-render');
const plumber = require('gulp-plumber');
const through = require('through2');
const { dest, src } = require('gulp');
const { green } = require('ansi-colors');
const { relative } = require('path');
const { build, dist, options, plugins } = require('../config');
const logger = require('../utils/logger');

const { dataFile, targets } = options.templates;

const templates = () => {
  const to = mode.production() ? build : dist;

  return src(targets.from)
    .pipe(mode.development(plumber()))
    .pipe(
      data(() => {
        return JSON.parse(fs.readFileSync(dataFile));
      }),
    )
    .pipe(nunjucksRender(plugins.nunjucks.options))
    .pipe(dest(to))
    .pipe(
      gulpif(
        bs.active && mode.development(),
        bs.stream({
          match: '**/*.html',
        }),
      ),
    )
    .pipe(
      through.obj((file, enc, callback) => {
        const input = relative(process.cwd(), file.history[0]);
        const output = relative(process.cwd(), file.path);

        logger('success', `${green(input)} -> ${green(output)}`);
        callback(null, file);
      }),
    );
};

module.exports = templates;
