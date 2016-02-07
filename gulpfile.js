var gulp = require("gulp");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('minify-js', function (){
    gulp.src('scripts/**/*.js') // path to your files
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(concat('app.js'))    
    .pipe(gulp.dest('public/assets/js/'));	
});

gulp.task('copy-templates', function() {
   gulp.src('scripts/**/*.{html,json}')
   .pipe(gulp.dest('public/assets/js/'));
});

gulp.task('compile-sass', function () {
    gulp.src('styles/**/*.scss') // path to your file
    .pipe(sass())
    .pipe(gulp.dest('public/assets/css/'));
});