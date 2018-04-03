var fs = require('fs');
var request = require('request-promise');
var config = require('./config');

module.exports = {
  create: function(opts) {
    var url = config.HOST + '/projects';
    console.log(url);
    var options = {
      method: 'POST',
      uri: url,
      body: {
        name: opts.name,
        metadata: {
          changesetComment: opts.comment
        }
      },
      json: true,
      headers: {
        'User-Agent': 'Request-Promise',
        Authorization: config.TOKEN
      }
    };
    request(options)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      });
  },

  list: function() {
    var url = config.HOST + '/projects';
    var options = {
      method: 'GET',
      uri: url,
      json: true,
      headers: {
        'User-Agent': 'Request-Promise',
        Authorization: config.TOKEN
      }
    };
    request(options)
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
