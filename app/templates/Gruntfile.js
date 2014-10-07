// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('jit-grunt')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // Configurable paths
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
                '<%%= yeoman.app %>',
                '<%%= yeoman.test %>'
            ]
        },

        'livestyle': {
            // The root of your web application
            root: 'app',

            // The port that the web server will listen on
            port: 9000,

            // The fallback web server to proxy requests to in case of missing files
            // Very useful if you are working with a remote API or a backend that generates dynamic html
            // The value should be a valid url to the server you want to proxy to
            proxy: null,

            // Compile React Jsx to JavaScript
            jsx: false,

            // Compile Less to CSS
            less: true,

            // Compile Scss to CSS using node-sass
            scss: true,

            // Watch HTML-files and livereload on changes
            html: true,

            // Watch CSS bakground images and livereload on changes
            cssImages: true,

            // Run each image through the image processing pipeline exposed by express-processimage
            // Allows you to resize, recompress, change image format, rasterize SVG and much more
            // Reading the documentation is highly recommended: https://github.com/papandreou/express-processimage#express-processimage
            processimage: true,

            // Enable debug logging. VERY chatty!
            debug: false,

            // Translate the paths of incoming requests.
            // Think of it as a very primitive mod_rewrite that only works on request path prefixes.
            // For example, to translate all requests for /remoteDir/* to /localDir/* do this:
            // {
            //    '/remoteDir/': '/localDir/'
            // }
            //
            mappings: {},

            // Browser version configuration
            // This is used for autoprefixing, but may in the future also be used to browser version specific hacks
            browsers: [
                '> 1%',
                'last 2 versions',
                'Firefox ESR',
                'Opera 12.1'
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

            // Browser support configuration to send to autoprefixer and other transforms.
            // Browser support syntax documentation: https://github.com/ai/autoprefixer#browsers
            browsers: [
                '> 1%',
                'last 2 versions',
                'Firefox ESR',
                'Opera 12.1'
            ],

            // Compile less files
            less: true,

            // Compile scss files
            scss: true,

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

    grunt.registerTask('serve', [
        'livestyle'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'reduce'
    ]);

    grunt.registerTask('default', [
        'serve'
    ]);
};
