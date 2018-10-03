title: gulp 套件的更新調整
categories: 程式技術筆記
tags:
  - JavaScript
  - Gulp
  - npm
toc: false
date: 2017-07-13 14:46:42
description:
---

最近直接從 **[Yeoman][2]** 用了一個 **Scaffolding** 的[專案][1]，來練習一些簡單操作等等...，，發現 package 都是舊版，就順手更新了一下，然後就 gulp file 的設定在執行的時候就發生錯誤。<!-- more -->

列出幾個需要注意的要點
- gulp-uglify
這套件只有支援 **es5**；沒錯，就算更新後還是只有 **es5**，所以一定要搭配使用 **[gulp-babel][3]**
- gulp-useref
此套件更新後，原有的一些 function 變成屬性，需要注意一下
- gulp-filter
在[我的練習專案][1]中，__filter.restore()__ 在更新後，變成了 `filter('',{"restore":true})` 這樣的做法。

## 錯誤修正
以下按照上述的那些要點，列出顯示的錯誤訊息，以及詳細的處理方式。
> unable to minify JavaScript Caused by: SyntaxError: Unexpected token: name ...(略)
這訊息很明顯是沒辦法將 js 檔案壓縮，因為裡面的 js 語法不是 es5，例如:let、const...。以下列出解決方式的範例：
``` js
const babel = require('gulp-babel');
// Scripts
gulp.task('scripts', function () {
    return gulp.src(['app/scripts/**/*.js'])
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('default'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe($.uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('dist/scripts'));
});
```
> ReferenceError: assets is not defined ...(略)
這個錯誤可以參照 [gulp-useref Github issue][5] ，在更新後，已經沒有 assets 這 function 了，直接使用 `useref()` 即可。

> 錯誤示範
``` js
cssFilter.restore()
```
> 這樣會發生錯誤，顯示以下錯誤訊息
> filter.restore is not a function ...(略)
> 修正這個 restore 後，另一個可能的錯誤示範
``` js
var cssFilter = $.filter('**/*.css');
    gulp.src('app/*.html')
        .pipe(cssFilter)
        .pipe(gulp.dest('dist'))
        .pipe($.csso())
        .pipe(cssFilter.restore)
        .pipe(gulp.dest('dist'));
```
> 因為 restore 沒有設定好，所以會有以下的錯誤訊息
> Cannot read property 'on' of undefined at DestroyableTransform.Readable.pipe ...(略)
這二個問題也是 package 更新後，已經變動了，所以需要變更設置方式，以下列出設定範例：
註：範例中 **gulp-load-plugins** 包含了 **gulp-filter**
``` js
const gulp = require('gulp'),
     c sso = require('gulp-csso'),
      useref = require('gulp-useref'),
    // Load plugins
    $ = require('gulp-load-plugins')();

// HTML
gulp.task('html', ['styles', 'scripts'], function () {
    var cssFilter = $.filter('**/*.css', { "restore": true });
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(cssFilter)
        .pipe(gulp.dest('dist'))
        .pipe($.csso())
        .pipe(cssFilter.restore)
        .pipe(gulp.dest('dist'));
});
```

最後附上 **gulpfile** 更新後的內容，這版本比較符合原本的套件。這個練習的 [Github][1]

``` js
'use strict';

const gulp = require('gulp'),
    open = require('open'),
    babel = require('gulp-babel'),
    gutil = require('gulp-util'),

    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),

    cache = require('gulp-cache'),
    csso = require('gulp-csso'),
    wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),

    // Load plugins
    $ = require('gulp-load-plugins')();

// Styles
gulp.task('styles', function () {
    return gulp.src(['app/styles/main.css'])
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('app/styles'))
        .pipe($.size());
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src(['app/scripts/**/*.js'])
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('default'))
        .pipe($.size());
});

// Images
gulp.task('images', function () {
    return gulp.src([
            'app/images/**/*',
            'app/lib/images/*'
        ])
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

// HTML
gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js', { "restore": true });
    var cssFilter = $.filter('**/*.css', { "restore": true });

    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(gulp.dest('dist'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe($.uglify())
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(gulp.dest('dist'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe($.csso())
        .pipe(cssFilter.restore)
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {
        read: false
    }).pipe(clean());
});

// Build
gulp.task('build', ['html', 'images']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Connect
gulp.task('connect', function () {
    $.connect.server({
        root: 'app',
        port: 9000,
        livereload: true
    });
});

// Open
gulp.task('serve', ['connect'], function () {
    open("http://localhost:9000");
});

// Inject Bower components
gulp.task('wiredep', function () {
    gulp.src('app/styles/*.css')
        .pipe(wiredep({
            directory: 'app/bower_components',
            ignorePath: 'app/bower_components/'
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components',
            ignorePath: 'app/'
        }))
        .pipe(gulp.dest('app'));
});

// Watch
gulp.task('watch', ['connect', 'serve'], function () {
    // Watch for changes in `app` folder
    gulp.watch([
        'app/*.html',
        'app/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ], function (event) {
        return gulp.src(event.path)
            .pipe($.connect.reload());
    });

    // Watch .css files
    gulp.watch('app/styles/**/*.css', ['styles']);

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);

    // Watch bower files
    gulp.watch('bower.json', ['wiredep']);
});
```

[1]: https://github.com/shunnien/LeafletMap
[2]: http://yeoman.io/
[3]: https://www.npmjs.com/package/gulp-babel
[4]: https://github.com/johnpapa/pluralsight-gulp/issues/34
[5]: https://github.com/jonkemp/gulp-useref/issues/153