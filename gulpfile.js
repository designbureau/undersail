var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var postcssimport = require('postcss-import');
var tailwind = require('tailwindcss');
var sourcemaps = require('gulp-sourcemaps');
var nested = require('postcss-nested');

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
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass-build', function () {
  var processors = [
    postcssimport,
    tailwind,
    nested,
    autoprefixer,
    cssnano
  ];
  return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/css'));
});




//compile and watch
gulp.task('watch', function () {
  gulp.watch('src/scss/*.scss', gulp.series('sass'));
});

//compile and minify
gulp.task('build', function () {
  gulp.watch('src/scss/*.scss', gulp.series('sass-build'));
});

