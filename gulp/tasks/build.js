import babel from 'gulp-babel';
import gulp from 'gulp';

gulp.task('build', () =>
    gulp.src('app/**')
        .pipe(babel({presets: ['@babel/preset-env']}))
        .pipe(gulp.dest('dist')));

gulp.task('build-dist', gulp.series('lint', 'build'));
