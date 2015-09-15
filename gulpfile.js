var gulp = require('gulp'),
	watchify = require('watchify'),
	stringify = require('stringify')
	browserify = require('gulp-browserify')
	plumber = require('gulp-plumber')
	less = require('gulp-less')
	// config = require('./.env.js')
	envify = require('envify/custom')

gulp.task('default', ['scripts', 'watch', 'less'])

gulp.task('scripts', function(){
	gulp.src(['./src/app.js'])
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(browserify({
			debug: false,
			transform: [
				stringify(['.html']),
				envify(config)
			]
		}))
		.pipe(gulp.dest('dist'))	
})

gulp.task('less', function(){
	gulp.src('./src/less/wolfandrabbit.less')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(less())
		.pipe(gulp.dest('dist/less'))
})

gulp.task('watch', function(){
	gulp.watch('./src/**', ['scripts'])
	gulp.watch('./src/less/**', ['less'])
})

var onError = function(err){
	console.error(err.message)
}

