const { series, src, dest, watch } = require('gulp'),
 babel = require('gulp-babel'),
 uglify = require('gulp-uglify'),
 sass = require('gulp-sass'),
 autoprefixer = require('gulp-autoprefixer'),
 cleanCSS = require('gulp-clean-css'),
 server = require('gulp-server-livereload');
sass.compiler = require('node-sass');

function jsTranspile() {
 return src('./src/js/index.js')
  .pipe(
   babel({
    presets: ['@babel/env']
   })
  )
  .pipe(uglify())
  .pipe(dest('./app'));
}

function scssTranspile() {
 return src('./src/scss/index.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(dest('./app'));
}

function CSSautoprefixer() {
 return src('./app/index.css')
  .pipe(autoprefixer())
  .pipe(dest('./app'));
}

function minifyCSS() {
 return src('./app/index.css')
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(dest('./app'));
}

function webserver() {
 return src('./app').pipe(
  server({
   livereload: true,
   open: true
  })
 );
}

exports.build = series(webserver);
watch('./src/js/index.js', jsTranspile);
watch(
 './src/scss/**/*.scss',
 series(scssTranspile, CSSautoprefixer, minifyCSS)
);
