var gulp        = require('gulp'),
    size        = require('gulp-filesize'),
    coffee      = require('gulp-coffee'),
    coffeelint  = require('gulp-coffeelint'),
    changed     = require('gulp-changed'),
    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps'),
    del         = require('del')
    rename      = require('gulp-rename'),
    gutil       = require('gulp-util');

var filePath = {
  build_dir: './dist',
  lint: { src: ['./src/*.coffee']},
  coffee: {
    src: ['./src/*.coffee'],
    dest: './dist/*.js',
    dest_dir: './dist',
    clean: './dist/*'
  }
}

gulp.task('clean', function() {
  return del([filePath.coffee.clean])
});

gulp.task('lint', function() {
  return gulp.src(filePath.lint.src)
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
});

gulp.task('coffee', function() {
  return gulp.src(filePath.coffee.src)
    .pipe(changed(filePath.coffee.dest_dir, { extension: '.js' }))
    .pipe(gulp.dest(filePath.coffee.dest_dir))
    .pipe(sourcemaps.init())
    .pipe(size())
    .pipe(coffee({ bare: true }).on('error', gutil.log))
    .pipe(size())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(filePath.coffee.dest_dir))
});

gulp.task('compress', ['coffee'], function() {
  return gulp.src(filePath.coffee.dest)
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(size())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(filePath.coffee.dest_dir));
});

gulp.task('watch-coffee', function() {
  gulp.watch(filePath.coffee.src, ['build']);
});

gulp.task('build', ['lint', 'clean', 'compress']);
gulp.task('watch', ['watch-coffee']);
gulp.task('default', ['watch']);
