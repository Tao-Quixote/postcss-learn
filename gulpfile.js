var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var maps = require('gulp-sourcemaps');
var cssnano = require('cssnano');
var rename = require('gulp-rename');

function style(cb) {
    return gulp.src('./src/*.css')
        .pipe(postcss([autoprefixer]))
        .pipe(gulp.dest('./dest'))
}

function minify(cb) {
    gulp.src('./dest/example.css')
        .pipe(postcss([autoprefixer]))
        .pipe(postcss([cssnano]))
        .pipe(rename('example.min.css'))
        .pipe(maps.init())
        .pipe(maps.write('maps/'))
        .pipe(gulp.dest('./dest'));
    cb();
}


function watch() {
    gulp.watch('src/*.css', gulp.series(style, minify))
}

exports.default = watch;