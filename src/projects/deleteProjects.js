var request = require('request-promise');
var config = require('./../config');

module.exports = function(idProject) {
  var url = config.HOST + '/projects/' + idProject;
  var options = {
    method: 'DELETE',
    uri: url,
    headers: {
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
