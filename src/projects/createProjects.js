var request = require('request-promise');
var config = require('./../config');

module.exports = function(opts) {
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
};
