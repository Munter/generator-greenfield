'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var WebappAssetgraphGenerator = module.exports = function WebappAssetgraphGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WebappAssetgraphGenerator, yeoman.generators.Base);

/*
WebappAssetgraphGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'confirm',
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    //this.someOption = props.someOption;

    cb();
  }.bind(this));
};
*/

WebappAssetgraphGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

WebappAssetgraphGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/styles');
  this.mkdir('app/scripts');
  this.mkdir('app/images');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

WebappAssetgraphGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
};

WebappAssetgraphGenerator.prototype.html5bp = function projectfiles() {
  this.copy('app/index.html', 'app/index.html');
  this.copy('app/404.html', 'app/404.html');
  this.copy('app/favicon.ico', 'app/favicon.ico');
  this.copy('app/robots.txt', 'app/robots.txt');
  this.copy('app/.htaccess', 'app/.htaccess');

  this.copy('app/styles/main.css', 'app/styles/main.css');
  this.copy('app/scripts/main.js', 'app/scripts/main.js');
};
