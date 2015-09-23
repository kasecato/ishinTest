// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');

// Lint Task
gulp.task('lint', function () {
    return gulp.src('js/ishinTest.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src(
        [
            'js/jquery.js',
            'js/ishinTest.js'
        ]
    )
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Concatenate & Minify CSS
gulp.task('css', function () {
    return gulp.src(
        [
            'css/*.css'
        ])
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.css'))
        .pipe(minifycss({processImport: false}))
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('css/*.css', ['css']);
});

// Optimizing Images
gulp.task('images', function () {
    return gulp.src([
        'img/**/*.jpg',
        'img/**/*.png',
        'img/**/*.gif'
    ])
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('dist/img'));
});

// Default Task
gulp.task('default', ['lint', 'css', 'scripts', 'images', 'watch']);
