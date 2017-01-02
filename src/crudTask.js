var fs = require('fs');
var request = require('request');
var task = {
  "name": "Tiger delta",
  "description": "Detection of tiger delta for main cities in the United States",
  "file": "./data/tiger.geojson",
  "changesetComment": "Aligning or naming imported tiger roads #to-fix"
};
var token = process.env.token;
module.exports = {
  create: function(host, file) {
    console.log('CREATE TASK :' + host + '/tasks');
    var formData = {
      name: task.name,
      description: task.description,
      changesetComment: task.changesetComment,
      file: fs.createReadStream(file)
    };
    request.post({
      url: host + '/tasks',
      formData: formData,
      auth: {
        'bearer': token
      }
    }, function(err, res) {
      if (err) console.log(err);
      console.log(res.body);
    });
  },
  list: function(host) {
    console.log('LIST TASK :' + host + '/tasks');
    request.get({
      url: host + '/tasks'
    }, function(err, res) {
      if (err) console.log(err);
      console.log(res.body);
    });
  },
  update: function(host, idtask, file) {
    console.log('UPDATE TASK :' + host + '/tasks');
    // Actualizar aqui para la tarea
    var formData = {
      idtask: idtask,
      name: 'Crossing major highways and buildings',
      description: 'Major highways which are intersecting with buildings',
      changesetComment: 'Fixing major highways which are crossing with buildings',
      isCompleted: 'false'
    };
    if (file) {
      formData.file = fs.createReadStream(file);
    }
    request.put({
      url: host + '/tasks',
      formData: formData,
      auth: {
        'bearer': token
      }
    }, function(err, res) {
      if (err) console.log(err);
      console.log(res.body);
    });
  },
  delete: function(host, idtask) {
    request.delete({
      url: host + '/tasks',
      formData: {
        idtask: idtask
      },
      auth: {
        'bearer': process.env.token
      }
    }, function(err, res) {
      if (err) console.log(err);
      console.log(res.body);
    });
  }
};