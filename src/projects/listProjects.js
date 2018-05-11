var request = require('request-promise');
var config = require('./../config');

module.exports = function() {
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
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
};
