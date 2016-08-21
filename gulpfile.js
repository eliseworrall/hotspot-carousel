var gulp         = require('gulp'); 

// Include plugins
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var cssmin       = require('gulp-cssmin');
var rename       = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var webpack      = require('gulp-webpack');
var sass         = require('gulp-sass');
var pxtorem      = require('gulp-pxtorem');

//CSS
gulp.task('sass', function () {
  return gulp.src('./style/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }))
    .pipe(pxtorem())
    //.pipe(cssmin())
    //.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./style'));
});

//JS
gulp.task('webpack', function() {
    return gulp.src('./script/script.js')
        .pipe(webpack({
            module: {
                loaders: [
                    {
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'stage-2'],
                            plugins: ["transform-es3-property-literals", "transform-es3-member-expression-literals"]
                        }
                    },
                ]
            },
            resolve: {
                extensions: ['', '.js']
            },
            externals: {
                "$": "jQuery",
                "jquery": "jQuery"
            }
        }))
        .pipe(rename('script.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./script'));
});

gulp.task('default', ['sass', 'webpack']);
