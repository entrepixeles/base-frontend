/* Config Gulp Task */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    gutil = require('gulp-util');

//Vars
var path = {
    jade: ['jade/**/*.jade'],
    html: 'public/',
    sass: 'sass/**/*.sass',
    css: 'public/css/',
    js: 'public/js/*.js',
    jsmin: 'public/js/min',
    htmlwatch: './public/*.html',
    csswatch: './public/css/*.css'
},
CONST = {
    PORT : 9001,
    ROOT : 'public'
};

//Livereload - Watch Taks HTML - CSS
gulp.task('connect', function(){
    connect.server({
        root: CONST.ROOT,
        port: CONST.PORT,
        livereload: true
    });
});

//Jade
gulp.task('jade', function() {
    return gulp.src(path.jade)
    .pipe(jade({
        pretty: true
    }).on('error', gutil.log))
    .pipe(gulp.dest(path.html))
    .pipe(connect.reload());
});

//Sass
gulp.task('sass', function () {
    gulp.src(path.sass)
    .pipe(sass({
        sourceComments: 'normal',
        indentedSyntax: true,
        outputStyle: 'compressed',
        sourceMap: true
    }).on('error', gutil.log))
    .pipe(gulp.dest(path.css))
    .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src(path.htmlwatch)
    .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src(path.csswatch)
    .pipe(connect.reload());
});

//Watch SASS JADE
gulp.task('watch', function () {
    gulp.watch(path.jade, ['jade']);
    gulp.watch(path.sass, ['sass']);
    gulp.watch([path.htmlwatch], ['html']);
    gulp.watch([path.csswatch], ['css']);
});

//Watch Server, JADE, SASS
gulp.task('default', ['connect','watch']);


//Min js
gulp.task('minjs', function() {
  gulp.src(path.js)
    .pipe(uglify({
        outSourceMap: true
    }).on('error', gutil.log))
    .pipe(rename(function (files) {
        if(files.extname === '.js') {
            files.basename += '.min';
        }
    }))
    .pipe(gulp.dest(path.jsmin))
});

//Concat
gulp.task('concat', function() {
    gulp.src(['js/lib/plugin1.js', 'js/lib/plugin2.js', 'js/lib/plugin3.js'])
        .pipe(concat('js/rpp_utils.js'))
        .pipe(gulp.dest('public/js/'))
});
