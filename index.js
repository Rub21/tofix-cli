#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var projects = require('./src/projects');
var items = require('./src/items');
var config = require('./src/config');
var action = argv._[0];
console.log(action);
switch (action) {
  case 'create-project':
    projects.createProjects({
      name: argv.name,
      comment: argv.comment
    });
    break;
  case 'list-projects':
    projects.listProjects();
    break;
  case 'delete-project':
    projects.deleteProjects(argv.idProject);
    break;
  case 'create-items':
    items.createItems(argv.file, argv.idProject);
    break;
  case 'list-items':
    items.listItems(argv.idProject);
    break;
  case 'delete-items':
    items.deleteItems(argv.file, argv.idProject);
    break;
  default:
    console.log('unknown command');
}