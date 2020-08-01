/**
 * GSB
 * -----------------------------------------------------------------------------
 *
 * Lint scss files via Stylelint.
 */
const { src } = require('gulp');
const gulpStylelint = require('gulp-stylelint');
const {
  options: {
    stylelint: { targets },
  },
} = require('../config');

const stylelint = () => {
  return src(targets.from).pipe(
    gulpStylelint({
      reporters: [{ formatter: 'string', console: true }],
    }),
  );
};

module.exports = stylelint;
