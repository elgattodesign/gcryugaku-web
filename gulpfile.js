var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sassGlob = require('gulp-sass-glob');
var browserSync = require( 'browser-sync' );
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssdeclsort = require('css-declaration-sorter');
var sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function() {
return gulp
.src( './src/scss/**/*.scss' )
.pipe( plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }) )
.pipe( sassGlob() )
.pipe( sass({
outputStyle: 'compressed'
}) )
.pipe( postcss([ autoprefixer(
{
"overrideBrowserslist": ["last 2 versions", "ie >= 11", "Android >= 5"],
cascade: false}
) ]) )
.pipe( postcss([ cssdeclsort({ order: 'alphabetical' }) ]) )
.pipe(gulp.dest('src/css/'));
});

gulp.task( 'browser-sync', function(done) {
browserSync.init({
server: {
baseDir: "./",
index: "index.html"
}
});
done();
});
gulp.task( 'bs-reload', function(done) {
browserSync.reload();
done();
});

gulp.task( 'watch', function(done) {
gulp.watch( './src/scss/**/*.scss', gulp.task('sass') );
gulp.watch('./src/scss/**/*.scss', gulp.task('bs-reload'));
});

gulp.task('default', gulp.series(gulp.parallel('browser-sync', 'watch')));
