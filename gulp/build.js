'use strict';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    size = require('gulp-size'),
    merge = require('merge-stream');


gulp.task('compress', ['browserify'], function() {
    var overload = gulp.src('dist/browser/overload.js')
        .pipe(rename('overload.min.js'))
        .pipe(uglify({
            output: {
                comments: true
            }
        }))
        .pipe(gulp.dest('dist/browser'))
        .pipe(size());

    var overloadGlobal = gulp.src('dist/browser/overload.global.js')
        .pipe(rename('overload.global.min.js'))
        .pipe(uglify({
            output: {
                comments: true
            }
        }))
        .pipe(gulp.dest('dist/browser'))
        .pipe(size());

    return merge(overload, overloadGlobal);
});

gulp.task('clean-browser', function() {
    return gulp.src('dist/browser', {
            read: false
        })
        .pipe(clean())
        .pipe(size());
});

gulp.task('browserify', ['clean-browser'], function() {
    var overload = gulp.src('lib/overload.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(rename('overload.js'))
        .pipe(gulp.dest('./dist/browser/'))
        .pipe(size());

    var overloadGlobal = gulp.src('global.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(rename('overload.global.js'))
        .pipe(gulp.dest('./dist/browser/'))
        .pipe(size());

    return merge(overload, overloadGlobal);
});

gulp.task('build', ['clean-browser', 'browserify', 'compress']);