/**
 * GSB
 * -----------------------------------------------------------------------------
 *
 * Main config file. Values can be overridden by gulpfile.config file.
 */
const path = require('path');
const { argv } = require('yargs');
const { extend } = require('lodash');
const config = require('../gulpfile.config');

/**
 * -----------------------------------------------------------------------------
 * Build directory [Production]
 * -----------------------------------------------------------------------------
 *
 * @type {string}
 */
const build = argv.build || config.build || './build';

/**
 * -----------------------------------------------------------------------------
 * Dist directory [Development]
 * -----------------------------------------------------------------------------
 *
 * @type {string}
 */
const dist = argv.dist || config.dist || './dist';

/**
 * -----------------------------------------------------------------------------
 * Source directory
 * -----------------------------------------------------------------------------
 *
 * @type {string}
 */
const src = argv.src || config.src || './src';

/**
 * -----------------------------------------------------------------------------
 * Assets directory for copy without changes
 * -----------------------------------------------------------------------------
 *
 * @type {string}
 */
const copyDir = config.copyDir || `${src}/copy`;

/**
 * -----------------------------------------------------------------------------
 * Images directory
 * -----------------------------------------------------------------------------
 *
 * @type {string}
 */
const imagesDir = config.imagesDir || `${src}/images`;

/**
 * -----------------------------------------------------------------------------
 * Scripts directory
 * -----------------------------------------------------------------------------
 *
 * @type {string}
 */
const scriptsDir = config.scriptsDir || `${src}/scripts`;

/**
 * -----------------------------------------------------------------------------
 * Styles directory
 * -----------------------------------------------------------------------------
 *
 * @type {string}
 */
const stylesDir = config.stylesDir || `${src}/styles`;

/**
 * -----------------------------------------------------------------------------
 * Templates directory
 * -----------------------------------------------------------------------------
 *
 * @type {string}
 */
const templatesDir = config.templatesDir || `${src}/templates`;

/**
 * -----------------------------------------------------------------------------
 * Vendors directory
 * -----------------------------------------------------------------------------
 *
 * @type {string}
 */
const vendorsDir = config.vendorsDir || `${src}/vendors`;

/**
 * -----------------------------------------------------------------------------
 * Tasks options
 * -----------------------------------------------------------------------------
 *
 * @type {Object}
 */
const options = {
  clean: {
    targets: {
      from: [`${dist}/**`],
    },
  },
  copy: {
    targets: {
      from: [`${copyDir}/**`],
    },
  },
  eslint: {
    targets: {
      from: [`${scriptsDir}/*.js`],
    },
  },
  imagemin: {
    targets: {
      from: [`${imagesDir}/**/*.{gif,jpg,png,svg}`],
    },
  },
  scripts: {
    targets: {
      from: [`${scriptsDir}/*.js`],
    },
  },
  stylelint: {
    targets: {
      from: [`${stylesDir}/**/*.scss`],
    },
  },
  styles: {
    targets: {
      from: [`${stylesDir}/**/*.scss`],
    },
  },
  templates: {
    dataFile: `${templatesDir}/data.json`,
    targets: {
      from: [`${templatesDir}/*.njk`],
    },
  },
  vendors: {
    css: {
      targets: {
        from: `${vendorsDir}/vendors-css.json`,
      },
    },
    js: {
      targets: {
        from: `${vendorsDir}/vendors-js.json`,
      },
    },
  },
  watch: {
    targets: [
      {
        from: [`${copyDir}/**`],
        task: 'copy',
      },
      {
        from: [`${imagesDir}/**/*.{gif,jpg,png,svg}`],
        task: 'imagemin',
      },
      {
        from: `${scriptsDir}/*.js`,
        task: 'scripts',
      },
      {
        from: `${stylesDir}/**/*.scss`,
        task: 'styles',
      },
      {
        from: [`${templatesDir}/**/*.njk`],
        task: 'templates',
      },
      {
        from: [`${templatesDir}/data.json`],
        task: 'templates',
      },
      {
        from: `${vendorsDir}/vendors-css.json`,
        task: 'vendorsCSS',
      },
      {
        from: `${vendorsDir}/vendors-js.json`,
        task: 'vendorsJS',
      },
    ],
  },
};

/**
 * -----------------------------------------------------------------------------
 * Plugins options
 * -----------------------------------------------------------------------------
 *
 * @see https://github.com/borodean/postcss-assets
 * @see https://github.com/BrowserSync/browser-sync
 * @see https://github.com/scniro/gulp-clean-css
 * @see https://github.com/sindresorhus/gulp-imagemin
 * @see https://github.com/imagemin/imagemin-gifsicle
 * @see https://github.com/imagemin/imagemin-mozjpeg
 * @see https://github.com/imagemin/imagemin-pngquant
 * @see https://github.com/imagemin/imagemin-svgo
 * @see https://github.com/carlitoplatanito/gulp-nunjucks-render
 * @see https://github.com/dlmanning/gulp-sass
 * @see https://github.com/gulp-sourcemaps/gulp-sourcemaps
 * @see https://github.com/terinjokes/gulp-uglify/
 *
 * @type {Object}
 */
const plugins = {
  assets: {
    options: {
      basePath: dist,
      loadPaths: ['images', 'fonts'],
      relative: 'styles',
    },
  },
  browsersync: {
    options: {
      logLevel: 'silent',
      notify: false,
      server: {
        baseDir: './',
        serveStaticOptions: {
          extensions: ['html'],
        },
      },
      startPath: dist.replace('.', ''),
    },
  },
  cleancss: {
    options: {},
  },
  gifscale: {
    options: {
      interlaced: true,
      optimizationLevel: 2,
    },
  },
  mozjpeg: {
    options: {
      progressive: true,
      quality: 75,
    },
  },
  nunjucks: {
    options: {
      path: [`${templatesDir}/`],
    },
  },
  pngquant: {
    options: {
      quality: [0.7, 0.9],
      strip: true,
    },
  },
  sass: {
    options: {
      includePaths: ['./node_modules'],
      outputStyle: 'expanded',
      precision: 15,
    },
  },
  sourcemaps: {
    options: {
      includeContent: false,
      sourceRoot: path.relative(`${dist}/styles`, `${src}/styles`),
    },
  },
  svgo: {
    options: {
      plugins: [
        {
          cleanupAttrs: true,
          removeComments: true,
          sortAttrs: true,
        },
      ],
    },
  },
  uglify: {
    options: {},
  },
};

module.exports = {
  build,
  dist,
  src,
  copyDir,
  imagesDir,
  scriptsDir,
  stylesDir,
  templatesDir,
  vendorsDir,
  options: extend({}, options, config.options),
  plugins: extend({}, plugins, config.plugins),
};
