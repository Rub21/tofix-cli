var fs = require('fs');
const request = require('request-promise')

var config = require('./config');

module.exports = {
  create: function(opts) {
    const options = {
      method: 'POST',
      uri: config.HOST + '/projects',
      body: {
        name: opts.name,
        metadata: {
          changesetComment: opts.comment
        }
      },
      json: true,
      headers: {
        'User-Agent': 'Request-Promise',
        'Authorization': config.TOKEN
      }
    };
    request(options)
      .then(function(response) {
        console.log(response)
      })
      .catch(function(err) {
        console.log(err)
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
  // update: function(host, idtask, file, name, description, changesetComment) {
  //   console.log('UPDATE TASK :' + host + '/tasks');
  //   // Actualizar aqui para la tarea
  //   var formData = {
  //     idtask: idtask,
  //     name: name,
  //     description: description,
  //     changesetComment: changesetComment,
  //     isCompleted: 'false'
  //   };
  //   if (file) {
  //     formData.file = fs.createReadStream(file);
  //   }
  //   request.put({
  //     url: host + '/tasks',
  //     formData: formData,
  //     auth: {
  //       'bearer': config.TOKEN
  //     }
  //   }, function(err, res) {
  //     if (err) console.log(err);
  //     console.log(res.body);
  //   });
  // },
  // delete: function(host, idtask) {
  //   request.delete({
  //     url: host + '/tasks',
  //     formData: {
  //       idtask: idtask
  //     },
  //     auth: {
  //       'bearer': process.env.config.TOKEN
  //     }
  //   }, function(err, res) {
  //     if (err) console.log(err);
  //     console.log(res.body);
  //   });
  // }
};