var fs = require('fs');
var request = require('request');

var token = process.env.token;
module.exports = {
  delete: function(host, idtask, type, key) {
    request.delete({
      url: host + '/tasks/'  + idtask + '/' + type + '/items/' + key+'?token='+token
    }, function(err, res) {
      if (err) console.log(err);
      console.log(res.body);
    });
  }
};