const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const del = require("del");
const njk = require("gulp-nunjucks-render");
const changed = require("gulp-changed");
const beautify = require("gulp-beautify");
const sass = require("gulp-sass")(require("sass"));



function clean() {
  return del(["dist"]);
}

function browserSync(cb) {
  browsersync.init({
    server: {
      baseDir: "./dist",
    },
  });
  cb();
}

function reload(cb) {
  browsersync.reload();
  cb();
}

function html() {
  return gulp
    .src("src/html/pages/*")
    // .pipe(changed("src/html/**/*"))
    .pipe(njk({ path: ["src/html"] }))
    .pipe(beautify.html({ indent_size: 2, preserve_newlines: false }))
    .pipe(gulp.dest("dist"))
    .pipe(browsersync.stream());
}

function css() {
  return gulp
    .src("src/scss/**/*.scss")
    // .pipe(changed("src/scss/**/*.scss"))
    .pipe(sass({ includePaths: ["node_modules"] }).on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browsersync.stream());
}

function js() {
  return gulp
    .src("src/js/**/*.js")
    .pipe(changed("src/js/**/*.js"))
    .pipe(gulp.dest("./dist/js"))
    .pipe(browsersync.stream());
}

function images() {
  return gulp.src("src/img/**/*")
    .pipe(gulp.dest("./dist/img"))
    .pipe(browsersync.stream())
}

function favicon(){
  return gulp.src("src/favicons/*")
    .pipe(gulp.dest("./dist"))
    .pipe(browsersync.stream())
}

function watchFiles() {
  gulp.watch("src/html/**/*", gulp.series(html, reload));
  gulp.watch("src/scss/**/*", gulp.series(css, reload));
  gulp.watch("src/js/**/*", gulp.series(js, reload));
  gulp.watch("src/img/**/*", gulp.series(images, reload));
}

exports.default = gulp.series(clean, favicon, html, css, js, images, browserSync, watchFiles);
// exports.watch = gulp.parallel(watchFiles, browserSync);
// exports.default = gulp.series(clean, gulp.parallel(html, css));
