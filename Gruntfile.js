module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['public/client/**/*.js'],
        dest: 'public/dist/build.js',
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      target: {
        files: {
          'public/dist/build.min.js': ['public/dist/build.js']
        }
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
        // 'public/client/app.js'
        'server.js',
        'public/client/*.js',
        'app/**/*.js',
        'app/*.js'
      ]
    },

    cssmin: {
      target: {
        files: {
          'public/dist/style.min.css': ['public/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  // grunt.registerTask('default', [
  //   'uglify', 'cssmin'
  // ]);

  // grunt.registerTask('eslint', [ 'eslint' ]);


  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', ['concat', 'uglify', 'cssmin']);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
      // git push live master
      grunt.task.run([ 'shell:prodServer']);
      console.log('prod');
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'mochaTest',
    'eslint',
    'build',
    'upload'
  ]);

};


// grunt.registerTask('asyncfoo', 'My "asyncfoo" task.', function() {
//   // Force task into async mode and grab a handle to the "done" function.
//   var done = this.async();
//   // Run some sync stuff.
//   grunt.log.writeln('Processing task...');
//   // And some async stuff.
//   setTimeout(function() {
//     grunt.log.writeln('All done!');
//     done();
//   }, 1000);
// });



// grunt.task.registerTask('foo', 'A sample task that logs stuff.', function(arg1, arg2) {
//   if (arguments.length === 0) {
//     grunt.log.writeln(this.name + ", no args");
//   } else {
//     grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
//   }
// });
