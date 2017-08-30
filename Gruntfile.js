module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	var config = grunt.file.readYAML("Gruntconfig.yml");

	grunt.initConfig({
		responsive_images: {
			dev : {
				options : {
			        engine: 'gm',  // added
					sizes : [{
						name: '210',
						width: 210
					}]
				},
	    		files : [{
	    			expand : true,
	    			src : ['images/*.*'],
	    			cwd : 'src/',
	    			dest : 'dist/'
	    		}]
			}
  		},
  		imagemin : {
  			dynamic : {
      			files: [{
        			expand: true,
	   				src: ['images/*.*'],
					cwd: 'dist/',
					dest: 'dist/'
				}]
			}
		},
		htmlmin: {
	      dist: {
	        options: {
	          removeComments: true,
			  ignoreCustomComments: [
				    /^\s+ko/,
				    /\/ko\s+$/
			  ],
	          collapseWhitespace: true
	        },
	        files: {
	          'dist/index.html': 'src/index.html'
	        }
	      }
		},
	    cssmin: {
	      target: {
	        files: [{
	          expand: true,
	          cwd: 'src/',
	          src: ['css/*.css'],
	          dest: 'dist/',
	          ext: '.css'
	        }]
	      }
	    },
	    uglify: {
	      all: {
	        files: [{
	          expand: true,
	          cwd: 'src/',
	          src: ['js/*.js'],
	          dest: 'dist/',
	          ext: '.js'
	        }]
	      }
	    },
	    copy: {
    	  options : {
	        	processContentExclude: [
	            	'**/*.{eot,svg,ttf,woff}'
	            ]
	  	  },
		  main: {
		  	files: [{
			    expand: true,
			    cwd: 'src/images',
			    src: '**',
			    dest: 'dist/images',
			    flatten: true,
			    filter: 'isFile'
			},{
			    expand: true,
			    cwd: 'src/css',
			    src: '**',
			    dest: 'dist/css',
			    flatten: true,
			    filter: 'isFile'
			}]
		  }
		}
	});

	grunt.registerTask('default', [
	    'htmlmin',
		'uglify',
		'imagemin',
		'responsive_images',
		'copy',
		'cssmin'
	]);
};