"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const cp = require("child_process");
const cssnano = require("cssnano");
const del = require("del");
const eslint = require("gulp-eslint");
const minify = require('gulp-minify');
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const sourcemaps = require('gulp-sourcemaps');
const webpack = require("webpack");
const webpackconfig = require("./webpack.config.js");
const webpackstream = require("webpack-stream");

// Clean assets
function clean() {
  //return del(["./assets/"]);
}

// Optimize Images
function images() {
  return gulp
    .src("./assets/img/**/*")
    .pipe(newer("./assets/img"))
    .pipe(
      imagemin([
        imagemin.gifsicle({
          interlaced: true
        }),
        // imagemin.jpegtran({
        //   progressive: true
        // }),
        imagemin.optipng({
          optimizationLevel: 5
        }),
        imagemin.svgo({
          plugins: [{
            removeViewBox: false,
            collapseGroups: true
          }]
        })
      ])
    )
    .pipe(gulp.dest("./assets/img"));
}

// CSS task
function css() {
  return gulp
    .src("./assets/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest("./assets/css/"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./assets/css/"))
}

function js() {
  return gulp.task('compress', function () {
    gulp.src(['./assets/*.js', './assets/*.mjs'])
      .pipe(minify())
      .pipe(gulp.dest('./assets/js'))
  });
}

// Watch files
function watchFiles() {
  gulp.watch("./assets/scss/**/*", css);
  gulp.watch("./assets/img/**/*", images);
  gulp.watch("./assets/js/**/*"), js;
}

// define complex tasks

const build = gulp.series(clean, gulp.parallel(css, images));
const watch = gulp.parallel(watchFiles);

// export tasks
exports.images = images;
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;