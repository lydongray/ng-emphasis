var gulp = require('gulp');
var dest = gulp.dest;
var karmaServer = require('karma').Server;
var jshint = require('gulp-jshint');
var del = require('del');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var annotate = require('gulp-ng-annotate');
var babel = require('gulp-babel');

var appName = 'ng-emphasis';
var buildEnv = 'dev';
var inputRoot = '';
var outputRoot = 'dist/';
var paths = {};
var configs = {};

setPaths(buildEnv);
setConfigs();

// Set environment and paths
function setPaths(env) {
    buildEnv = env;
    paths = {
        input: {
            js: {
                all: [
                    inputRoot + 'src/ng-emphasis.module.js', 
                    inputRoot + 'src/ng-emphasis.provider.js', 
                    inputRoot + 'src/ng-emphasis.directive.js']
            }
        },
        output: {
            root: outputRoot,
            modules: outputRoot + 'modules'
        }
    };
};

// Set configurations
function setConfigs() {
    configs = {
        uglify: {
            mangle: true
        },
        jscs: {
            fix: false
        },
        annotate: {
            add: true
        },
        babel: {
            presets: ['es2015']
        }
    };
};

// Cleans the output (deletes all files)
gulp.task('clean', function () {
    return del([
        paths.output.root + '*'
    ]);
});

// Check for coding mistakes
gulp.task('lint', function () {
    return gulp.src(paths.input.js.all)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Check for coding standards
gulp.task('jscs', function () {
    return gulp.src(paths.input.js.all)
        .pipe(jscs(configs.jscs))
        //.pipe(dest(paths.input.root)) // Automatically fix mistakes (also set fix=true in config)
        .pipe(jscs.reporter('jscs-stylish'));
});

// Run unit tests
gulp.task('unit-test', function (done) {
    new karmaServer({
        configFile: __dirname + '\\karma.conf.js',
        singleRun: true
    }, done).start();
});

// Build files
gulp.task('build-files', ['clean'], function() {
    return gulp.src(paths.input.js.all)
        // Output modules
        .pipe(gulp.dest(paths.output.modules))
        // Concat
        .pipe(concat(appName + '.js'))
        // Convert es6 to es5
        .pipe(babel(configs.babel))
        // Annotate
        .pipe(annotate(configs.annotate))
        // Output
        .pipe(dest(paths.output.root))
        //Minify
        .pipe(uglify(configs.uglify))
        .pipe(rename(appName + '.min.js'))
        // Output
        .pipe(dest(paths.output.root));
});

// Build 
gulp.task('build', function (done) {
    runSequence('clean', ['lint', 'jscs', 'unit-test'], 'build-files', function () {
        done();
    });
});
