/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;


describe('greenfield generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('greenfield:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            '.jshintrc',
            '.jshintignore',
            '.bowerrc',
            '.editorconfig',
            'package.json',
            'bower.json',
            'Gruntfile.js'
        ];

        helpers.mockPrompt(this.app, {
            'someOption': true
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            assert.file(expected);
            done();
        });
    });
});
