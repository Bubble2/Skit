/**
 * Created by shijinyu on 2015/9/10.
 */
'use strict';

var path = require('path');
var fs = require('fs');

var gulp = require('gulp');
var sass = require('gulp-sass');
var gdo = require('gulp-gdo');
var sourcemaps = require('gulp-sourcemaps');

var modulePath = "./public/scripts/module/";

gulp.task('sass', function () {
    gulp.src('public/sass/**/[^_]*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'})
            .on('error', sass.logError))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('update',function(){
    gulp.src(modulePath + '**/*.js')
        .pipe(gdo(function(file,parsedPath){
            var pathCfg = path.join(parsedPath.dirname,"package.json");
            var cfg = require(modulePath + pathCfg);
            cfg.update = new String(new Date().getTime());
            try{
                fs.writeFileSync(modulePath+pathCfg,JSON.stringify(cfg),'utf8');
            }catch(err){
                console.log("Sync file Error:",err.message);
            }

        }));
});

gulp.task('default', function () {
    // gulp.watch('public/sass/**/*.scss', ['sass']);
    gulp.watch(modulePath + '**/*.js', ['update']);
});