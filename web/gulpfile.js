const gulp = require('gulp')
const gulpless = require('gulp-less')
const postcss = require('gulp-postcss')
const debug = require('gulp-debug')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const path = require('path')
const NpmImportPlugin = require('less-plugin-npm-import')

gulp.task('less', function () {
  const plugins = [autoprefixer(), cssnano()]

  return gulp
    .src('src/theme/antd/*-theme.less')
    .pipe(debug({title: 'files:'}))
    .pipe(
      gulpless({
        javascriptEnabled: true,
        plugins: [new NpmImportPlugin({prefix: '~'})],
      }),
    )
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./public'))
})
