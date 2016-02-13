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

gulp.task("html", function() {
  var stream = gulp.src('public/*.html') 
  .pipe(connect.reload()); 
  return stream;
});

var getVersion = function () {
    return fs.readFileSync('Version');
};
 
var getCopyrightVersion = function () {
    return fs.readFileSync('Copyright');
};

gulp.task('minify-js', ['minify-templates','copy-json'], function (){
  var stream = gulp.src('scripts/**/*.js')
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(header(getCopyrightVersion(), {version: getVersion()}))
    .pipe(gulp.dest('public/assets/js/'))
    .pipe(connect.reload());
  return stream;
});

gulp.task('minify-templates', function () {
  var stream = gulp.src('scripts/**/*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('public/assets/js/'))    
  return stream;  
});

gulp.task('copy-json', function() {
  var stream = gulp.src('scripts/**/*.json')
   .pipe(gulp.dest('public/assets/js/'))
  return stream;
});

gulp.task('compile-sass', function () {
  var stream = gulp.src('styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer()) 
    .pipe(minifyCSS({ noAdvanced: true }))    
    .pipe(sourcemaps.write())    
    .pipe(gulp.dest('public/assets/css/'))
    .pipe(connect.reload());
  return stream;  
});

gulp.task('watch', function() { 
    gulp.watch('styles/**/*.scss', ['compile-sass']);
    gulp.watch('scripts/**/*.js', ['minify-js']);
    //gulp.watch('resources/images/**/*.{jpg,png,gif}');
    gulp.watch('scripts/**/*.html', ['minify-templates']);
    gulp.watch('scripts/**/*.json', ['copy-json']);
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

gulp.task('develop', ['minify-js', 'compile-sass', 'watch', 'connect'], function() {
  //Now open in browser 
  var stream = gulp.src("") 
  .pipe(openPage({ 
    app: "google chrome", 
    uri: "http://localhost:8000"
  })); 
  return stream; 
});