var fs = require('fs');
var request = require('request');
var token = process.env.token;
module.exports = {
  changerole: function(host, role, iduser) {
    console.log('CHANGE ROLE: ' + iduser);
    request.put({
      url: host + '/users',
      formData: {
        iduser: iduser,
        role: role
      },
      auth: {
        'bearer': token
      }
    }, function(err, res) {
      if (err) console.log(err);
      console.log(res.body);
    });
  },
  deleteuser: function(host, iduser) {
    console.log('DELETE :' + host + '/users');
    request.delete({
      url: host + '/users',
      formData: {
        iduser: iduser
      },
      auth: {
        'bearer': process.env.token
      }
    }, function(err, res) {
      if (err) console.log(err);
      console.log(res.body);
    });
  },
  listusers: function(host) {
    console.log('LIST :' + host + '/users');
    request.get({
      url: host + '/users?token='+token,
    }, function(err, res) {
      if (err) console.log(err);
      console.log(res.body);
    });
  }
};