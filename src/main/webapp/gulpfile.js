var gulp        = require('gulp');
var changed     = require('gulp-changed');
var del         = require('del');
var webserver   = require('gulp-webserver');
var gutil       = require('gulp-util');
var browserify  = require('browserify');
var uglify      = require('gulp-uglify');
var streamify   = require('gulp-streamify');
var gulpif      = require('gulp-if');
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
var reactify    = require('reactify');
var notify      = require('gulp-notify');
var sass        = require('gulp-ruby-sass');
var autopref    = require('gulp-autoprefixer');
var minifycss   = require('gulp-minify-css');
var open        = require("gulp-open");
var plumber     = require("gulp-plumber")
var svgSymbols  = require("gulp-svg-symbols")
var fileinclude = require('gulp-file-include')


var paths = {
  bundle: './app/js/app.js',
  scripts: ['app/js/**/*.js', 'app/js/**/*.jsx'],
  imageFiles: 'app/img/**/*',
  styles: 'app/styles/**/*.scss',
  dist: 'dist/app',
  staticFiles: ['app/index.html',
    'app/search.html',
    'app/impressum.html',
    'app/unternehmer.html',
    'app/eintrag.html',
    'app/kontakt.html',
    'app/agbs.html',
    'node_modules/jquery-placeholder/jquery.placeholder.min.js'],
  fontsFiles: ['app/fonts/*'],
  cssFiles: ['app/styles/font-awesome.min.css'],
  indexHtml: "http://localhost:9000/index.html",
  icons: ['app/favicon.ico']

};


var real_build = true;



function handleError(task) {
  return function(err) {
    gutil.log(gutil.colors.red(err));
    notify.onError(task + ' failed, check the logs..')(err);
  };
}


gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del([paths.dist], cb);
});


/*
 * images
 */
gulp.task('images', [], function() {
  var dest = paths.dist + '/img';

  return gulp.src(paths.imageFiles)
    .pipe(changed(dest))
    // Pass in options to the task
//    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(dest));
});

/*
 * static ressources
 */
gulp.task('static', [], function() {
  var dest = paths.dist;

  return gulp.src(paths.staticFiles)
    .pipe(changed(dest))
    .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
    .pipe(gulp.dest(dest));
});

/*
 * fonts ressources
 */
gulp.task('fonts', [], function() {
  var dest = paths.dist + '/fonts';

  return gulp.src(paths.fontsFiles)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});

/*
 * css ressources
 */
gulp.task('css', [], function() {
  var dest = paths.dist + '/css';

  return gulp.src(paths.cssFiles)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});


function createBundle(bundleFile, bundleName) {
  var bundler, rebundle;
  bundler = browserify({
    entries: bundleFile,
    basedir: __dirname,
    extensions: ['.jsx'],
    insertGlobals : false,
    debug: !real_build,
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: !real_build // required to be true only for watchify
  });
  if(!real_build) {
    bundler = watchify(bundler)
  }

  bundler.transform(reactify);

  rebundle = function() {
    var stream = bundler.bundle();
    stream.on('error', handleError('Browserify'));
    stream = stream.pipe(source(bundleName))

    // uglify
    if(real_build) {
      stream.pipe(streamify(uglify({
        mangle: {
          except: ['require', 'export', '$super']
        }
      })));
    }
    return stream.pipe(gulp.dest(paths.dist + '/js'));
  };

  bundler.on('update', rebundle);
  return rebundle();
}

/*
 * scripts
 */
gulp.task('scripts', function() {
  createBundle('./app/js/app.js', 'app.js');
  createBundle('./app/js/eintrag.js', 'eintrag.js');
});

/*
 * styles
 */
gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(sass({ style: 'expanded' }))
    .pipe(gulpif(real_build, autopref('> 5%')))
    .pipe(gulpif(real_build, minifycss()))
    .pipe(gulp.dest(paths.dist + '/css'));
});

/*
 * icons
 */
gulp.task('icons', function() {
  var dest = paths.dist;

  return gulp.src(paths.icons)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});


/*
 * server
 */
gulp.task('serve', ['prepare_serve', 'build', 'watch'], function() {
  var options = {
    url: paths.indexHtml,
    app: "google-chrome"
  };

  gulp.src(paths.dist)
    .pipe(webserver({
      host: "0.0.0.0",
      port: 9000,
      livereload: true,
      directoryListing: true,
//      fallback: 'index.html',
      proxies: [{
        source: '/datenplaetze',
        target: 'http://localhost:8080/datenplaetze'
      },
      {
        source: '/orte',
        target: 'http://localhost:8080/orte'
      },
      {
        source: '/newsletter',
        target: 'http://localhost:8080/newsletter'
      },
      {
        source: '/info',
        target: 'http://localhost:8080/info'
      },
      {
        source: '/app',
        target: 'http://localhost:9000/'
      },
      {
        source: '/angebot',
        target: 'http://localhost:8080/angebot'
      }]
    }));

    gulp.src("./app/index.html")
    .pipe(open("", options));
});

/*
 * Rerun the task when a file changes
 */
gulp.task('watch', function() {
  gulp.watch(paths.staticFiles, ['static']);
  gulp.watch(paths.imageFiles, ['images']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.icons, ['icons']);
});


/*
 * build
 */
gulp.task('build', ['scripts', 'styles', 'images', 'icons', 'static', 'fonts', 'css']);

/*
 * build
 */
gulp.task('prepare_serve', [], function() {
  real_build = false;
});

/*
 * default
 */
gulp.task('default', ['build']);
