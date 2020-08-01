/**
 * GSB
 * -----------------------------------------------------------------------------
 *
 * Compress images via Imagemin.
 */
const bs = require('browser-sync').get('BS');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const mode = require('gulp-mode')();
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const pngquant = require('imagemin-pngquant');
const { dest, src } = require('gulp');
const {
  build: buildDir,
  dist: distDir,
  src: srcDir,
  imagesDir,
  options: {
    imagemin: { targets },
  },
  plugins,
} = require('../config');

const images = () => {
  const to = mode.production() ? imagesDir.replace(srcDir, buildDir) : imagesDir.replace(srcDir, distDir);

  return src(targets.from)
    .pipe(mode.development(plumber()))
    .pipe(newer(to))
    .pipe(
      imagemin(
        [
          imagemin.gifsicle(plugins.gifscale.options),
          imagemin.mozjpeg(plugins.mozjpeg.options),
          imagemin.svgo(plugins.svgo.options),
          pngquant(plugins.pngquant.options),
        ],
        {
          verbose: true,
        },
      ),
    )
    .pipe(dest(to))
    .pipe(
      gulpif(
        bs.active && mode.development(),
        bs.stream({
          match: '**/*.{gif,jpg,png,svg}',
        }),
      ),
    );
};

module.exports = images;
