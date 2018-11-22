var fs = require('fs');
var request = require('request-promise');
var config = require('./../config');

module.exports = function(idProject, query) {
  var url = config.HOST + '/projects/' + idProject + '/items?' + query;
  console.log(url);
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
    .then(function(items) {
      var strItems = '';
      for (var i = 0; i < items.length; i++) {
        strItems += JSON.stringify(items[i]) + '\n';
      }
      fs.writeFile('output.json', strItems, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log('The list was saved in output.json file!');
      });
    })
    .catch(function(err) {
      console.log(err);
    });
};
