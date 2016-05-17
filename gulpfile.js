var gulp = require('gulp');
var watch = require('gulp-watch');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var tsConfig = require('./src/tsconfig.json');
var connect = require('gulp-connect');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');
var del = require('del');
var config = require('./config/config.json');

//Typescript Config;
var tsProject = ts.createProject(tsConfig.compilerOptions);


//clean dist
gulp.task('clean:dist', function () {
    return del(['dist/**/*']);
})

//copy html/css/js files
gulp.task('copy:src', function () {
    return gulp.src([
        'src/systemjs.config.js',
        'index.html',
        'src/**/*.html',
        'src/**/*.css'
    ])
        .pipe(gulp.dest('dist'));
});

//compile app typescript files
gulp.task('compile:app', function () {
    // var tsProject = ts.createProject('./src/tsconfig.json');
    // return tsProject.src()
    //     .pipe(ts(tsProject))
    //     .pipe(gulp.dest('.'));
        
    return gulp.src('src/**/*.ts')
        .pipe(ts(tsProject))
        .pipe(gulp.dest('./dist/app'));
});

//live reload server
gulp.task('server', function () {
    browserSync({
        proxy: config.deploy.host+':'+config.deploy.port,
        port: config.deploy.browserSyncPort,
        browser: ['chrome'],
        notify: true
    });
});

//nodemon starts at index.js
gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: 'server.js',
        ignore: [
            'gulpfile.js',
            'node_modules/',
            'dist/'
        ]
    })
        .on('start', function () {
            if (!called) {
                called = true;
                cb();
            }
        })
        .on('restart', function () {
            setTimeout(function () {
                browserSync.reload({ stream: false });
            }, 1000);
        })
});

gulp.task('bsreload', function() {
    browserSync.reload;
});

gulp.task('sass', function () {
    return gulp.src('src/**/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('./dist'));
});



//default task
gulp.task('default', function () {
    runSequence('clean:dist', 'compile:app', 'sass', 'copy:src', 'nodemon', 'watch', 'server');
});

gulp.task('watch', function () {
    watch(['index.html', 'src/**/.js', 'src/**/*.ts', 'src/**/*.html', 'src/**/*.scss'], function () {
        runSequence('clean:dist', 'compile:app', 'sass', 'copy:src','bsreload');
    });
});