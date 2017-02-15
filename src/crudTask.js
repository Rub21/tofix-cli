var fs = require('fs');
var request = require('request');
var token = process.env.token;
module.exports = {
  create: function(host, file, name, description, changesetComment) {
    console.log('CREATE TASK :' + host + '/tasks');
    var formData = {
      name: name,
      description: description,
      changesetComment: changesetComment,
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
  update: function(host, idtask, file, name, description, changesetComment) {
    console.log('UPDATE TASK :' + host + '/tasks');
    // Actualizar aqui para la tarea
    var formData = {
      idtask: idtask,
      name: name,
      description: description,
      changesetComment: changesetComment,
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