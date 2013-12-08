// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // Configurable paths
            src: 'src',
            app: 'app',
            dist: 'dist',
            test: 'test'
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%%= yeoman.dist %>'
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%%= yeoman.app %>/scripts/vendor/*',
                '<%%= yeoman.test %>/spec/{,*/}*.js'
            ]
        },

        reduce: {
            // Source folder
            root: '<%%= yeoman.app %>',

            // Build destination folder
            outRoot: '<%%= yeoman.dist %>',

            // Root of your CDN. Optional
            //cdnRoot: 'https://my.amazon.s3.bucket',

            // minimatch patterns of files to include as base assets
            // Dependencies of these will be automatically populated
            // Paths are relative to reduce.root
            include: [
                '**/*.html',
                '**/.htaccess',
                '*.txt',
                '*.ico'
            ],

            // Compile less files and remove less.js from application
            less: true,

            // Run all available jpeg and png optimizations on images
            // For maximum efficiency install jpegtran, optipng, pngcrush and pngquant
            optimizeImages: true,

            // Create a cache manifest file
            // If one already exists it will be ammended with static assets
            manifest: false,

            // Set the 'async'-attribute on all script tags
            asyncScripts: true,

            // Pretty print assets. Good for debugging
            pretty: false, // Default: false

            // Inline CSS backgrounds below this byte threshold as data-uris
            // There will be an old IE fallback to the original image
            // 0 disables.
            inlineSize: 4096
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'reduce'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        //'test',
        'build'
    ]);
};
