module.exports = function (grunt) {

    //  Load Grunt Tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*

            Styles
        
        */
        compass: {
            options: {
                sassDir: 'assets/sass/',
                cssDir: 'css/',
                noLineComments: false,
                outputStyle: 'expanded'
            },

            build: {  }
        },

        // provide support for our browsers
        autoprefixer: {
            production: {
                src: 'css/style.css',
                dest: 'css/style.css'
            }
        },
        
        // combine common media queries
        cmq: {
            production: {
                files: {
                    'css/style.min.css': 'css/style.css'
                }
            },
        },


        /*
    
            Scripts
                - bower_concat: pulls main files from bower installs
                - concat: mash up files
                - uglify: remove cruft for production
                - jshint: validate js

        */

         // compile All Javascript
        concat_sourcemap: {
            options: {
                sourceRoot: "",
                sourcesContent: true
            },
            app: {
                src: [
                    'assets/app/app.js',
                    'assets/app/**/*.js'
                ],
                dest: 'scripts/app.js'
            }
        },

        uglify: {
            options: {
                mangle: true,
                compress: true,
                preserveComments: false
            },
            build: {
                files: {
                    'scripts/app.min.js' : ['scripts/app.js']
                }
            }
        },

        jshint: {
            beforeconcat: {
                options: {
                    expr: {
                        ExpressionStatements: true
                    },
                    asi: true
                },
                src: ['assets/scripts/**/*.js', 'assets/app/**/*.js']
            },

            afterconcat: {
                options: {
                    expr: {
                        ExpressionStatements: true
                    },
                    asi: true
                },
                src: ['scripts/app.js']
            }
        },

        
        /*
    
            Watch/Copy

        */

        watch: {
            styles: {
                files: [
                    'assets/sass/**/*.scss', 
                    'assets/app/**/*.js'
                ],
                tasks: [
                    'styles', 
                    'scripts',
                    'uglify', 
                    'clean'
                ]
            },
            
            options: {
                // spawn: false,
                // interrupt: true,
                debounceDelay: 150
            }
        },

        clean: ['tmp/']
    });


    // Define Tasks
    
     // Default Task
    grunt.registerTask('default', ['dev']);


    // main tasks
    grunt.registerTask('scripts', ['concat_sourcemap', 'jshint']);
    grunt.registerTask('styles', ['compass', 'autoprefixer', 'cmq']);


    // Build Tasks    
    grunt.registerTask('dev', [
        'clean',
        'styles',
        'scripts',
        'uglify',
        'clean',
        'watch'
    ]);
    
};