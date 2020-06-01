/*
 * TOC
 *
 * Init
 * - Requires
 * - Variables
 * - Directories and files
 * Tasks
 * - Assets JS
 * - Assets styles
 * - Clean
 * Default task
 */

// > Init
// >> Requires
var gulp =          require('gulp');
var sass =          require('gulp-sass');
var cssnano =       require('gulp-cssnano');
var autoprefixer =  require('gulp-autoprefixer');
var concat =        require('gulp-concat');
var uglify =        require('gulp-uglify');
var rename =        require('gulp-rename');
var rimraf =        require('gulp-rimraf');
var header =        require('gulp-header');

var pkg = require('./package.json');

// >> Variables
var headerString = '/*! <%= pkg.name %> v<%= pkg.version %> (c) <%= pkg.author %> | <%= pkg.homepage %> */\n';

// >> Directories and files
var dist = './dist';

var src = {
    js:     './src/js/formstyler.js',
    css:    './src/scss/formstyler.scss'
};

// > Tasks
// >> Assets JS
gulp.task('js', function() {
    return gulp.src(src.js)
        .pipe(gulp.dest(dist))
        .pipe(uglify())
        .pipe(header(headerString, {pkg}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dist));
});

// >> Assets styles
gulp.task('css', function() {
    return gulp.src(src.css)
        .pipe(sass())
        .pipe(autoprefixer({ cascade: false }))
        .pipe(concat('formstyler.css'))
        .pipe(gulp.dest(dist))
        .pipe(cssnano({
            discardComments: { removeAll: true }
        }))
        .pipe(header(headerString, {pkg}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dist));
});

// >> Clean
gulp.task('clean', function() {
 return gulp.src(dist + '/*', { read: false })
   .pipe(rimraf());
});

// > Default task
gulp.task('default', gulp.series('clean', 'js', 'css'));