var fs = require('fs');
var request = require('request');
var token = process.env.token;
module.exports = {
  create: function(host, file, name, description, changesetComment, idproject) {
    console.log('CREATE TASK :' + host + '/tasks');
    var formData = {
      idproject: idproject,
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
  list: function(host, idproject) {
    console.log('LIST TASK :' + host + '/' +idproject);
    request.get({
      url: host + '/' + idproject+'?token=' + token
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
  delete: function(host, idproject,idtask) {
    request.delete({
      url: host + '/tasks',
      formData: {
        idtask: idtask,
        idproject:idproject
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