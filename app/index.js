'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

function checkForCanvasError() {
    fs.stat('node_modules/grunt-reduce/node_modules/assetgraph-builder/node_modules/histogram', function (err, stat) {
        if (!err) {
            return;
        }

        var os = require('os');
        var EOL = os.EOL;
        var command = 'Run: _';
        var platformCommand = '';
        var then = 'npm install -f grunt-reduce';

        if (process.platform === 'linux') {
            platformCommand = 'sudo apt-get install -y libcairo2-dev libjpeg8-dev libgif-dev libpango1.0-dev';
        } else if (process.platform === 'darwin') {
            platformCommand = 'brew install cairo jpeg giflib pango';
        }

        if (process.platform.indexOf('win') === 0) {
            command = 'Visit ' + chalk.cyan('https://github.com/Automattic/node-canvas/wiki/Installation---Windows') + ' for installation instructions';
        } else {
            command = command.replace('_', chalk.cyan(platformCommand));
        }

        console.log(yosay(
            chalk.yellow('UH OH!') + ' Looks like the installation of canvas failed.' + EOL +
            'Canvas is used for image optimization and spriting.'
        ));

        console.log('To fix this problem: ' + command + ', then ' + chalk.cyan(then));
    });
}

var GreenfieldGenerator = module.exports = function GreenfieldGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({
            bower: !this.options['skip-install'],
            npm: !this.options['skip-install'],
            skipInstall: this.options['skip-install'],
            skipMessage: !this.options['skip-install'],
            callback: checkForCanvasError
        });

    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

};

util.inherits(GreenfieldGenerator, yeoman.generators.Base);


GreenfieldGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    //console.log(this.yeoman);

    var prompts = [{
        type: 'list',
        name: 'CSS',
        message: 'What flavor CSS do you like??',
        choices: [
            'CSS',
            'Scss',
            'Less'
        ],
        default: 'CSS'
    }];

    this.prompt(prompts, function (props) {
        this.cssPreProcessor = props.CSS;
        this.cssExtension = this.cssPreProcessor.toLowerCase();

        cb();
    }.bind(this));
};


GreenfieldGenerator.prototype.gruntfile = function gruntfile() {
    this.template('Gruntfile.js');
};

GreenfieldGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('app/styles');
    this.mkdir('app/scripts');
    this.mkdir('app/images');

    this.template('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
};

GreenfieldGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('jshintignore', '.jshintignore');
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
};

GreenfieldGenerator.prototype.html5bp = function projectfiles() {
    this.copy('app/404.html', 'app/404.html');
    this.copy('app/favicon.ico', 'app/favicon.ico');
    this.copy('app/robots.txt', 'app/robots.txt');
    this.copy('app/.htaccess', 'app/.htaccess');

    this.copy('app/styles/main.css', 'app/styles/main.' + this.cssExtension);

    this.copy('app/scripts/main.js', 'app/scripts/main.js');
};

GreenfieldGenerator.prototype.writeIndex = function writeIndex() {
    this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'app/index.html'));
    this.indexFile = this.engine(this.indexFile, this);

    this.write('app/index.html', this.indexFile);
};
