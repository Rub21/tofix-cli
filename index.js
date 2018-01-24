#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var crudProjects = require('./src/crudProjects');
var crudItem = require('./src/crudItem');
var crudUser = require('./src/crudUser');
var settingTask = require('./src/settingTask');
var exportES = require('./src/exportES');
var importES = require('./src/importES');
var config = require('./src/config');
var action = argv._[0];

console.log(action)
switch (action) {
  case 'create-project':
    crudProjects.create({
      name: argv.name,
      comment: argv.comment
    });
    break;
  case 'create-items':
    crudItem.create( argv.file, argv.idProject);
    break;
  default:
    console.log('unknown command');
}