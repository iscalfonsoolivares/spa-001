
var env               = process.env.NODE_ENV || 'development';

var fs                = require('fs');
var Server            = require('karma').Server;
var gulp              = require("gulp");
var uglify            = require("gulp-uglify");
var sass              = require("gulp-sass");
var autoprefixer      = require('gulp-autoprefixer'); 
var minifyCSS         = require('gulp-minify-css');
var concat            = require('gulp-concat');
var ngAnnotate        = require('gulp-ng-annotate');
var jshint            = require("gulp-jshint");
var minifyHtml        = require("gulp-minify-html");
var header            = require("gulp-header");
var jscs              = require('gulp-jscs');
var sourcemaps        = require('gulp-sourcemaps');
var connect           = require('gulp-connect');
var openPage          = require("gulp-open");
var protractor        = require("gulp-protractor").protractor;
var webdriver_update  = require('gulp-protractor').webdriver_update;

/**
 * 
 * Development flow
 * 
 */

gulp.task("html", function() {
  var stream = gulp.src('public/*.html') 
  .pipe(connect.reload()); 
  return stream;
});

gulp.task('minify-js', ['minify-templates','copy-json'], function (){
  var stream = gulp.src('scripts/**/*{.controller.js,.directive.js,.service.js,app.js}')
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
    gulp.watch('public/*.html', ['html']); 
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

/**
 * 
 * QA related tasks
 * 
 */

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

gulp.task('unit-testing', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('webdriver_update', webdriver_update);

gulp.task('protractor', ['webdriver_update'],function () {
    gulp.src(["example_spec.js"])
    .pipe(protractor({
        configFile: "protractor.conf.js"
    }))
    .on('error', function(e) { throw e })
});

/**
 * 
 * Default task
 * 
 */

gulp.task('default', function() {
  console.log('this is for .. ' + env);
});

/**
 * 
 * Auxiliary functions
 * 
 */

function getVersion() {
    return fs.readFileSync('Version');
};
 
function getCopyrightVersion() {
    return fs.readFileSync('Copyright');
};
