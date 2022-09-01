module.exports = function () {
  const gulp = require("gulp");
  const util = require("gulp-util");
  const replace = require("gulp-replace");
  const inlinesource = require("gulp-inline-source");
  const zip = require("gulp-zip");
  const advzip = require("gulp-advzip");
  const checkFileSize = require("gulp-check-filesize");

  const config = util.env.boilerplate.config;
  const zipConfig = config.tasks.zip;

  var replaceList = {
    tutorial: "t",
    card: "c",
    step: "st",
    startButton: "sB",
    gameWrapper: "gW",
    score: "s",
  };

  var valueList = [];
  for (var text in replaceList) {
    if (replaceList.hasOwnProperty(text)) {
      var value = replaceList[text];
      if (valueList.indexOf(value) >= 0) {
        console.log('----------- duplicate replace value: "' + value + '"');
      } else {
        valueList.push(value);
      }
    }
  }

  gulp.task("zip", function () {
    var task = gulp.src(config.destinationRoot + zipConfig.source).pipe(
      inlinesource({
        compress: false,
      })
    );

    for (var text in replaceList) {
      if (replaceList.hasOwnProperty(text)) {
        task = task.pipe(replace(text, replaceList[text]));
      }
    }

    return task
      .pipe(zip(zipConfig.filename))
      .pipe(advzip({ optimizationLevel: 4 }))
      .pipe(gulp.dest(zipConfig.destination))
      .pipe(
        checkFileSize({
          fileSizeLimit: 1024 * 13 * 2,
        })
      );
  });
};
