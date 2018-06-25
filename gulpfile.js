const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

// var browserify = require('browserify'),
//     babelify   = require('babelify'),
//     source     = require('vinyl-source-stream'),
//     buffer     = require('vinyl-buffer');

// gulp.task('build', function () {
//     return browserify('./server/server.js')
//         .transform(babelify)
//         .bundle()
//         .pipe(source('bundle.js'))
//         .pipe(gulp.dest('dist'))
//         .pipe(buffer());
// });
// gulp.task('default', () => {
//   return watch('./server/**/*.js', {
//     ignoreInitial: false
//   }, () => {
//     gulp.src('./server/**/*.js')
//       .pipe(babel({
//         "presets": [
//           "react-app"
//         ],
//         // presets: ['env'],
//         babelrc: false,
//         "plugins": [
//           "transform-es2015-modules-commonjs"
//         ]
//       }))
//       .pipe(gulp.dest('./build/'))
//   })
// });
gulp.task('default',() => {
    gulp.src('./server/**/*.js')
      .pipe(babel({
        "presets": [
          "react-app"
        ],
        // presets: ['env'],
        babelrc: false,
        "plugins": [
          "transform-es2015-modules-commonjs"
        ]
      }))
      .pipe(gulp.dest('./'))
  })

