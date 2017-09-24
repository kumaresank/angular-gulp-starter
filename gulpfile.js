const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const htmlnano = require('gulp-htmlnano');
const pump = require('pump');
const browserSync = require('browser-sync').create();

gulp.task('css', function() {
    gulp.src([
            './src/css/**/*.css'
        ]).pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('minify-css', () => {
    gulp.src('./dist/css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
    gulp.src([
            './node_modules/angular/angular.js',
            './node_modules/angular-route/angular-route.js',
            './src/js/**/*.js'
        ]).pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('minify-js', function(cb) {
    pump([gulp.src('./dist/js/*.js'), uglify(), gulp.dest('./dist/js')], cb);
});

gulp.task('html', function() {
    gulp.src('./src/templates/**/*.html')
        .pipe(htmlnano({ removeComments: false }))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('minify-html', function() {
    gulp.src('./dist/**/*.html')
        .pipe(htmlnano({ removeComments: false }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build', function() {
    gulp.start(['css', 'js', 'html'])
});

gulp.task('minify', function() {
    gulp.start(['minify-css', 'minify-js', 'minify-html'])
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        open: true,
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('start', function() {
    gulp.start(['build', 'browser-sync']);
    gulp.watch(['./src/css/**/*.css'], ['css']);
    gulp.watch(['./src/js/**/*.js'], ['js']);
    gulp.watch(['./src/templates/**/*.html'], ['html'])
});

gulp.task('prod', function() {
    gulp.start(['build', 'minify']);
});