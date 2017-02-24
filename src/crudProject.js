var fs = require('fs');
var request = require('request');
var token = process.env.token;

module.exports = {
  create: function(host, name, description, private, users) {
    // console.log('CREATE PROJECT :' + host + '/project');
    var formData = {
      name: name,
      description: description,
      private: private,
      allowedUsers: users
    };
    request.post({
      url: host + '/projects',
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
    // console.log('LIST PROJECTS :' + host + '/project');
    request.get({
      url: host + '/projects?token=' + token,
    }, function(err, res) {
      if (err) console.log(err);
      console.log(res.body);
    });
  },
  update: function(host, idproject, name, description, private, users) {
    console.log('UPDATE PROJECT :' + host + '/projects');
    var formData = {
      idproject: idproject,
      name: name,
      description: description,
      private: private,
      allowedUsers: users
    };
    request.put({
      url: host + '/projects',
      formData: formData,
      auth: {
        'bearer': token
      }
    }, function(err, res) {
      if (err) console.log(err);
      console.log(res.body);
    });
  },
  delete: function(host, idproject) {
    request.delete({
      url: host + '/projects',
      formData: {
        idproject: idproject
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