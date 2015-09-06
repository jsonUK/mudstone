/*
 * sass 
 * compile scss with libsass
 */


var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    handleErrors    = require('../util/handleErrors'),
    config          = require('../config').sass,
    gulpif          = require('gulp-if'),
    size            = require('gulp-size'),
    handleErrors    = require('../util/handleErrors'),
    env             = require('../config').env,
    autoprefixer    = require('autoprefixer-core'),
    postcss         = require('gulp-postcss');

gulp.task('sass', function () {
  return gulp.src(config.watch)
    .pipe(gulpif(env == 'dev', sourcemaps.init()))
    .pipe(sass({
        outputStyle: config.options.outputStyle,
        includePaths: require('node-bourbon').includePaths
      }
    ))
    .on('error', handleErrors)
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(postcss([ autoprefixer({ browsers: config.prefix }) ]))
    .pipe(gulpif(env == 'dev', sourcemaps.write('./')))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(size())
    // .pipe(browserSync.reload({stream:true}));
});