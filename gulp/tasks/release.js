import gulp from 'gulp';
import {release} from 'gulp-release-it';

release(gulp);

gulp.task('complete-release', gulp.series('build-dist', 'bump-complete-release'));
