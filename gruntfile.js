module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt
            .file
            .readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'scripts.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        postcss: {
            options: {
                map: true, // inline sourcemaps

                // or
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: 'dist/css/' // ...to the specified directory
                },

                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: '*.css',
                dest: 'dist/css/style.css'
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['env']
            },
            dist: {
                files: {
                    'dist/js/scripts.js': 'scripts.js'
                }
            }
        },
        watch: {
            scripts: {
              files: ['scripts.js'],
              tasks: ['babel'],
              options: {
                spawn: false,
              },
            },
          },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['postcss', 'babel']);

};