/**
 * GSB
 * -----------------------------------------------------------------------------
 *
 * Merge vendors js files from vendors-js.json into vendor.css.
 */
const bs = require('browser-sync').get('BS');
const concat = require('gulp-concat');
const fs = require('fs');
const gulpif = require('gulp-if');
const mode = require('gulp-mode')();
const through = require('through2');
const { dest, src } = require('gulp');
const { green } = require('ansi-colors');
const { relative } = require('path');
const { build: buildDir, dist: distDir, src: srcDir, vendorsDir, options } = require('../config');
const logger = require('../utils/logger');

const { targets } = options.vendors.js;

const vendorsJS = (callback) => {
  const to = mode.production() ? vendorsDir.replace(srcDir, buildDir) : vendorsDir.replace(srcDir, distDir);
  const json = JSON.parse(fs.readFileSync(targets.from));

  return json.vendors.length
    ? src(json.vendors)
        .pipe(concat('vendors.js'))
        .pipe(dest(to))
        .pipe(gulpif(bs.active && mode.development(), bs.stream()))
        .pipe(
          through.obj((file, enc, cb) => {
            const input = relative(process.cwd(), file.history[0]);
            const output = relative(process.cwd(), file.path);

            logger('success', `${green(input)} -> ${green(output)}`);
            cb(null, file);
          }),
        )
    : fs.writeFile(`${to}/vendors.js`, '', callback);
};

module.exports = vendorsJS;
