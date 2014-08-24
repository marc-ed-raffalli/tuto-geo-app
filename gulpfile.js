var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require("gulp-rename"),
    rimraf = require('gulp-rimraf'),
    uglify = require('gulp-uglify'),
    webpack = require('gulp-webpack');


var bases = {
    app: 'app/geoapp/',
    dist: 'dist/'
};

// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src(bases.dist)
        .pipe(rimraf());
});

gulp.task('lint', function () {
    return gulp.src(bases.app + '*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('build', ['clean'], function () {
    return gulp.src('src/main.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(uglify())
        .pipe(gulp.dest(''));
});

gulp.task('copy-index', ['clean'], function () {
    return gulp.src('index.html')
        .pipe(gulp.dest(bases.dist));
});

gulp.task('copy-index-prod', ['clean'], function () {
    return gulp.src('index-prod.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest(bases.dist));
});

gulp.task('watch', function () {
    gulp.watch(bases.app + '*.js', ['build']);
});

gulp.task('build-dev', ['clean', 'copy-index', 'build']);

gulp.task('default', ['clean', 'copy-index-prod', 'lint', 'build']);
