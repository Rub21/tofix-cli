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

  list: function() {
    const options = {
      method: 'GET',
      uri: config.HOST + '/projects',
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
  }
};