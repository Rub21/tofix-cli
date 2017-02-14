#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var crudTask = require('./src/crudTask');
var crudItem = require('./src/crudItem');
var crudUser = require('./src/crudUser');
var settingTask = require('./src/settingTask');
var exportES = require('./src/exportES');
var importES = require('./src/importES');

var config = require('./src/config');
var host = config[argv._[0]];
var action = argv._[1];

if (host) {
  switch (action) {
    case 'create':
      crudTask.create(host, argv.file);
      break;
    case 'list':
      crudTask.list(host);
      break;
    case 'update':
      crudTask.update(host, argv.id, argv.file);
      break;
    case 'delete':
      crudTask.delete(host, argv.id);
      break;
    case 'changerole':
      crudUser.changerole(host, argv.role, argv.iduser);
      break;
    case 'deleteuser':
      crudUser.deleteuser(host, argv.iduser);
      break;
    case 'listusers':
      crudUser.listusers(host);
      break;
    case 'replacetask':
      settingTask.replacetask(host, argv.id);
      break;
    case 'updateNoterror':
      settingTask.updateNoterror(host, argv.id, argv.file);
      break;
    case 'deleteitem':
      crudItem.delete(host, argv.idtask, argv.type, argv.key);
      break;
    case 'export':
      exportES.export(host);
      break;
    case 'import':
      importES.import(host);
      break;
    default:
      console.log('unknown command');
  }
}