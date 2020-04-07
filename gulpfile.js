var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var postcssimport = require('postcss-import');
var tailwind = require('tailwindcss');
var sourcemaps = require('gulp-sourcemaps');
var nested = require('postcss-nested');
var purgecss = require('gulp-purgecss');

var concat = require('gulp-concat');
//var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


gulp.task('sass', function () {
  var processors = [
    postcssimport,
    tailwind,
    nested,
    autoprefixer,
  ];
  return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(purgecss({
      content: ['./**/*.php']
    }))
    .pipe(gulp.dest('./dist/css'));
});


gulp.task('sass-min', function () {
  var processors = [
    postcssimport,
    tailwind,
    nested,
    autoprefixer,
    cssnano
  ];
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(purgecss({
      content: ['./**/*.php']
    }))
    .pipe(gulp.dest('./dist/css'));
});


gulp.task('scripts', function () {
  var jsFiles = './src/js/**/*.js',
    jsDest = './dist/js';
  return gulp.src(jsFiles)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(jsDest));
});


gulp.task('scripts-min', function () {
  var jsFiles = './src/js/**/*.js',
    jsDest = './dist/js';
  return gulp.src(jsFiles)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});


//compile and watch
gulp.task('watch', function () {
  gulp.watch('./**/*.php', gulp.series('sass'));
  gulp.watch('src/scss/*.scss', gulp.series('sass'));
  gulp.watch('src/js/**/*.js', gulp.series('scripts'));
});

//compile and minify, watch
gulp.task('build', function () {
  gulp.watch('./**/*.php', gulp.series('sass-min'));
  gulp.watch('src/scss/**/*.scss', gulp.series('sass-min'));
  gulp.watch('src/js/**/*.js', gulp.series('scripts-min'));
});

