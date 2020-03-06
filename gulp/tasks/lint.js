import gulp from 'gulp';
import eslint from 'gulp-eslint';
import paths from '../utils/paths';

const lintStream = (stream) => stream
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());

gulp.task('lint', () => lintStream(gulp.src(`${paths.srcDir}/**/*.js`)));
