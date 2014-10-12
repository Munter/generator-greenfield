'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var GreenfieldGenerator = module.exports = function GreenfieldGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
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
        default: true
    }];

    this.prompt(prompts, function (props) {
        this.cssPreProcessor = props.CSS;

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

    switch (this.cssPreProcessor) {
    case 'Scss':
        this.copy('app/styles/main.css', 'app/styles/main.scss');
        break;
    case 'Less':
        this.copy('app/styles/main.css', 'app/styles/main.less');
        break;
    default:
        this.copy('app/styles/main.css', 'app/styles/main.css');
    }
    this.copy('app/scripts/main.js', 'app/scripts/main.js');
};

GreenfieldGenerator.prototype.writeIndex = function writeIndex() {
    this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'app/index.html'));
    this.indexFile = this.engine(this.indexFile, this);

    this.write('app/index.html', this.indexFile);
};
