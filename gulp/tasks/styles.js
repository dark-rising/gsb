/**
 * GSB
 * -----------------------------------------------------------------------------
 *
 * Compile scss files to css and minify them via CleanCSS in production mode.
 *
 * Development mode: sourcemaps -> sass -> postcss(autoprefixer + assets)
 * Production mode: sass -> postcss(autoprefixer + assets) -> cleancss
 */
const assets = require('postcss-assets');
const autoprefixer = require('autoprefixer');
const bs = require('browser-sync').get('BS');
const cleancss = require('gulp-clean-css');
const gulpif = require('gulp-if');
const mode = require('gulp-mode')();
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const through = require('through2');
const { dest, src } = require('gulp');
const { green } = require('ansi-colors');
const { relative } = require('path');
const {
  build: buildDir,
  dist: distDir,
  src: srcDir,
  stylesDir,
  options: {
    styles: { targets },
  },
  plugins,
} = require('../config');
const logger = require('../utils/logger');

const styles = () => {
  const to = mode.production() ? stylesDir.replace(srcDir, buildDir) : stylesDir.replace(srcDir, distDir);

  return src(targets.from)
    .pipe(mode.development(plumber()))
    .pipe(mode.development(sourcemaps.init()))
    .pipe(sass.sync(plugins.sass.options))
    .pipe(postcss([autoprefixer(), assets(plugins.assets.options)]))
    .pipe(mode.production(cleancss(plugins.cleancss.options)))
    .pipe(mode.development(sourcemaps.write('.', plugins.sourcemaps.options)))
    .pipe(mode.development(plumber.stop()))
    .pipe(dest(to))
    .pipe(
      gulpif(
        bs.active && mode.development(),
        bs.stream({
          match: '**/*.css',
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

module.exports = styles;
