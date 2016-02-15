
var env               = process.env.NODE_ENV || 'development';

var fs                = require('fs');
var Server            = require('karma').Server;
var gulp              = require("gulp");
var plugins           = require('gulp-load-plugins')({camelize: true});

/**
 * 
 * Development flow
 * 
 */

gulp.task("html", function() {
  var stream = gulp.src('public/*.html')
  .pipe(plugins.connect.reload()); 
  return stream;
});

gulp.task('minify-js', ['minify-templates','copy-json'], function (){
  var stream = gulp.src('scripts/**/*{.controller.js,.directive.js,.service.js,app.js}')
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify())
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.header(getCopyrightVersion(), {version: getVersion()}))
    .pipe(gulp.dest('public/assets/js/'))
    .pipe(plugins.connect.reload());
  return stream;
});

gulp.task('minify-templates', function () {
  var stream = gulp.src('scripts/**/*.html')
    .pipe(plugins.minifyHtml())
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
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer()) 
    .pipe(plugins.minifyCss({ noAdvanced: true }))    
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('public/assets/css/'))
    .pipe(plugins.connect.reload());
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
  plugins.connect.server({
    root: './public/', 
    port: 8000, 
    livereload: true 
  });
});

gulp.task('develop', ['minify-js', 'compile-sass', 'watch', 'connect'], function() {
  //Now open in browser 
  var stream = gulp.src("") 
  .pipe(plugins.open({ 
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
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter());
});

gulp.task('jscs', function() {
    return gulp.src('scripts/**/*.js')
        .pipe(plugins.jscs())
        .pipe(plugins.jscs.reporter());
});

gulp.task('unit-testing', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('webdriver_update', plugins.protractor.webdriver_update);

gulp.task('protractor', ['webdriver_update'],function () {
    gulp.src(["example_spec.js"])
    .pipe(plugins.protractor.protractor({
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
