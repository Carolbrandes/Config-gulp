const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify')
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const { series } = require("gulp");

// Specific Task
function js() {
    return gulp
    .src('src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}
gulp.task(js);

// Specific Task
function gulpSass() {
    return gulp
    .src(['src/scss/*.scss'])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}
gulp.task(gulpSass);

gulp.task('watch', function(){
    gulp.watch('src/js/*.js', gulp.series(js))
    gulp.watch('src/scss/*.scss', gulp.series(gulpSass))
})


// Run multiple tasks
gulp.task('start', gulp.series(js, gulpSass));