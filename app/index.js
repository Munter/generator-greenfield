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
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

WebappAssetgraphGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
