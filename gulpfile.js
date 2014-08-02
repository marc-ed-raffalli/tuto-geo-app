var gulp = require('gulp'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    webpack = require('gulp-webpack');

var bases = {
    app: 'app/geoapp/',
    dist: 'dist/'
};

// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src(bases.dist)
        .pipe(clean());
});

gulp.task('lint', function () {
    return gulp.src(bases.app + '*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('build', function () {
    return gulp.src('src/main.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(uglify())
        .pipe(gulp.dest(''));
});

gulp.task('watch', function () {
    gulp.watch(bases.app + '*.js', ['build']);
});

gulp.task('default', ['clean', 'lint', 'build']);