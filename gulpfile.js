var gulp          = require("gulp");
var fs            = require('fs');
var uglify        = require("gulp-uglify");
var sass          = require("gulp-sass");
var autoprefixer  = require('gulp-autoprefixer'); 
var minifyCSS     = require('gulp-minify-css');
var concat        = require('gulp-concat');
var ngAnnotate    = require('gulp-ng-annotate');
var jshint        = require("gulp-jshint");
var minifyHtml    = require("gulp-minify-html");
var header        = require("gulp-header");
var jscs          = require('gulp-jscs');
var sourcemaps    = require('gulp-sourcemaps');
var connect       = require('gulp-connect');
var openPage      = require("gulp-open");

var getVersion = function () {
    return fs.readFileSync('Version');
};
 
var getCopyrightVersion = function () {
    return fs.readFileSync('Copyright');
};

gulp.task("html", function() {
  var stream = gulp.src('public/*.html') 
  .pipe(connect.reload()); 
  return stream;
});

gulp.task('jslint', function () {
    gulp.src('scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('jscs', function() {
    return gulp.src('scripts/**/*.js')
        .pipe(jscs())
        .pipe(jscs.reporter());
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

gulp.task('copy-json', function() {
   gulp.src('scripts/**/*.json')
   .pipe(gulp.dest('public/assets/js/'));
});

gulp.task('compile-sass', function () {
    gulp.src('styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer()) 
    .pipe(minifyCSS({ noAdvanced: true }))    
    .pipe(sourcemaps.write())    
    .pipe(gulp.dest('public/assets/css/'));
});

gulp.task('watchjs', function () {
    gulp.watch(['scripts/**/*.js'], ['minify-js']);
});

gulp.task('watchcss', function () {
    gulp.watch(['styles/**/*.scss'], ['compile-sass']);
});

gulp.task('watch', function() { 
    //gulp.watch('resources/scss/**/*.scss', ['compile-sass']);
    //gulp.watch('scripts/**/*.js', ['minify-js']);
    //gulp.watch('resources/images/**/*.{jpg,png,gif}');
    gulp.watch('public/index.html', ['html']); 
});

// Deprecated :
gulp.task('copy-templates', function() {
   gulp.src('scripts/**/*.{html,json}')
   .pipe(gulp.dest('public/assets/js/'));
});

gulp.task('connect', function() { 
  connect.server({
    root: './public/', 
    port: 8000, 
    livereload: true 
  });
});

gulp.task('default', ['watch','connect'], function() {
  //Now open in browser 
  var stream = gulp.src("") 
  .pipe(openPage({ 
    app: "google chrome", 
    uri: "http://localhost:8000"
  })); 
  return stream; 
});