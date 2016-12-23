module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: ['public/src/scripts/**/*.js']
		},

		concat: {
			dist: {
				src: ['public/src/scripts/*.js', 'public/src/scripts/**/*.js'],
				dest: 'public/dist/js/app.js'
			}
		},

		uglify: {
			options: {
		    	mangle: false
		    },
			build: {
				files: {
					'public/dist/js/app.min.js': ['public/src/scripts/*.js', 'public/src/scripts/**/*.js']
				}
			}
		},

		sass: {
			dist: {
				files: {
					'public/dist/css/style.css': 'public/src/stylesheets/style.scss'
				}
			}
		},

		cssmin: {
			build: {
				files: {
					'public/dist/css/style.min.css': 'public/dist/css/style.css'
				}
			}
		},

		watch: {
			css: {
				files: ['public/src/stylesheets/*.scss'],
				tasks: ['sass', 'cssmin']
			},
			
			js: {
				files: ['public/src/scripts/**/*.js'],
				tasks: ['jshint', 'uglify', 'concat']
			}
		},

		nodemon: {
			dev: {
				script: 'index.js'
			}
		},

		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			tasks: ['nodemon', 'watch']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default', ['sass', 'cssmin', 'jshint', 'uglify', 'concat', 'concurrent']);
}