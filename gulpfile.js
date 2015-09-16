/**
 * Created by shijinyu on 2015/9/10.
 */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    gulp.src('public/sass/**/[^_]*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'})
            .on('error', sass.logError))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('watches', function () {
    gulp.watch('public/sass/**/*.scss', ['sass']);
});