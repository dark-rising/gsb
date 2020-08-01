/**
 * GSB
 * -----------------------------------------------------------------------------
 *
 * Lint js files via ESLint.
 */
const { src } = require('gulp');
const gulpEslint = require('gulp-eslint');
const {
  options: {
    eslint: { targets },
  },
} = require('../config');

const eslint = () => {
  return src(targets.from).pipe(gulpEslint()).pipe(gulpEslint.format()).pipe(gulpEslint.failAfterError());
};

module.exports = eslint;
