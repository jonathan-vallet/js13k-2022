module.exports = function() {
    const gulp = require('gulp');
    const util = require('gulp-util');
    const inlinesource = require('gulp-inline-source');
    const zip           = require('gulp-zip');
    const checkFileSize = require('gulp-check-filesize');

    const config = util.env.boilerplate.config;
    const zipConfig = config.tasks.zip;

    gulp.task('zip', function () {
        return gulp.src(config.destinationRoot + zipConfig.source)
            .pipe(inlinesource({
                compress: false
            }))
            .pipe(zip(zipConfig.filename))
            .pipe(gulp.dest(zipConfig.destination))
            .pipe(checkFileSize({
                fileSizeLimit: 16384
            }));
    });
};