/**
 * GSB
 * -----------------------------------------------------------------------------
 *
 * Transpile js files via Babel and minify them in production mode via UglifyJs.
 */
const babel = require('gulp-babel');
const bs = require('browser-sync').get('BS');
const gulpif = require('gulp-if');
const mode = require('gulp-mode')();
const plumber = require('gulp-plumber');
const through = require('through2');
const uglify = require('gulp-uglify');
const { dest, src } = require('gulp');
const { green } = require('ansi-colors');
const { relative } = require('path');
const {
  build: buildDir,
  dist: distDir,
  src: srcDir,
  scriptsDir,
  options: {
    scripts: { targets },
  },
  plugins,
} = require('../config');
const logger = require('../utils/logger');

const scripts = () => {
  const to = mode.production() ? scriptsDir.replace(srcDir, buildDir) : scriptsDir.replace(srcDir, distDir);

  return src(targets.from)
    .pipe(mode.development(plumber()))
    .pipe(babel())
    .pipe(mode.production(uglify(plugins.uglify.options)))
    .pipe(dest(to))
    .pipe(
      gulpif(
        bs.active && mode.development(),
        bs.stream({
          match: '**/*.js',
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

module.exports = scripts;
