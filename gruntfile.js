module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt
      .file
      .readJSON('package.json'),
    postcss: {
      options: {
        // map: false, // inline sourcemaps

        // // or
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
        src: 'style.css',
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
        files: [
          'style.scss', 'scripts.js'
        ],
        tasks: [
          'sass', 'babel', 'postcss'
        ],
        options: {
          spawn: false
        }
      }
    },
    sass: {
      dist: {
        files: {
          'style.css': 'style.scss'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'postcss', 'babel']);

};