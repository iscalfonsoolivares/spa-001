var gulp = require("gulp");
var fs = require('fs');
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var jshint = require("gulp-jshint");
var minifyHtml = require("gulp-minify-html");
var header = require("gulp-header");

var getVersion = function () {
    return fs.readFileSync('Version');
};
 
// Get copyright using NodeJs file system
var getCopyrightVersion = function () {
    return fs.readFileSync('Copyright');
};

gulp.task('jslint', function () {
    gulp.src('scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('minify-js', function (){
    gulp.src('scripts/**/*.js')
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(header(getCopyrightVersion(), {version: getVersion()}))
    .pipe(gulp.dest('public/assets/js/'));	
});

gulp.task('minify-html', function () {
    gulp.src('scripts/**/*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('public/assets/js/'));
});

//gulp.task('copy-templates', function() {
//   gulp.src('scripts/**/*.{html,json}')
//   .pipe(gulp.dest('public/assets/js/'));
//});

gulp.task('copy-json', function() {
   gulp.src('scripts/**/*.json')
   .pipe(gulp.dest('public/assets/js/'));
});

gulp.task('compile-sass', function () {
    gulp.src('styles/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/assets/css/'));
});

gulp.task('watchjs', function () {
    gulp.watch(['scripts/**/*.js'], ['minify-js']);
});

gulp.task('watchcss', function () {
    gulp.watch(['styles/**/*.scss'], ['compile-sass']);
});

