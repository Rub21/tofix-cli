#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var crudTask = require('./src/crudTask');
var crudProject = require('./src/crudProject');
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
    //projects
    case 'createp':
      crudProject.create(host, argv.name, argv.description, argv.private, argv.users || '*');
      break;
    case 'listp':
      crudProject.list(host);
      break;
    case 'updatep':
      crudProject.update(host, argv.idproject, argv.name, argv.description, argv.private, argv.users);
      break;
    case 'deletep':
      crudProject.delete(host, argv.idproject);
      break;
    default:
      //end projects
    case 'createt':
      crudTask.create(host, argv.file, argv.name, argv.description, argv.comment, argv.idproject);
      break;
    case 'listt':
      crudTask.list(host, argv.idproject);
      break;
    case 'updatet':
      crudTask.update(host, argv.idtask, argv.file, argv.name, argv.description, argv.comment);
      break;
    case 'deletet':
      crudTask.delete(host, argv.idtask);
      break;
      ///users
    case 'changerole':
      crudUser.changerole(host, argv.role, argv.iduser);
      break;
    case 'deleteu':
      crudUser.deleteuser(host, argv.iduser);
      break;
    case 'listu':
      crudUser.listusers(host);
      break;
    case 'userd':
      crudUser.userdetail(host);
      break;
    case 'replacetask':
      settingTask.replacetask(host, argv.idtask);
      break;
    case 'updateNoterror':
      settingTask.updateNoterror(host, argv.idtask, argv.file);
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

      console.log('unknown command');
  }
}