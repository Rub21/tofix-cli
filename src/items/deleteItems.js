var fs = require('fs');
var request = require('request-promise');
var turf = require('@turf/turf');
var BlueBirdQueue = require('bluebird-queue');
var config = require('./../config');
var readline = require('readline');

module.exports = function(file, idProject) {
  var url = config.HOST + '/projects/' + idProject + '/items';
  console.log(url);
  var q = new BlueBirdQueue({
    concurrency: 5
  });
  var rd = readline.createInterface({
    input: fs.createReadStream(file)
  });
  rd.on('line', function(item) {
    var id = JSON.parse(item).id;
    var urlItem = config.HOST + '/projects/' + idProject + '/items/' + id
    console.log(urlItem)
    var options = {
      method: 'DELETE',
      uri: urlItem,
      headers: {
        Authorization: config.TOKEN
      }
    };
    q.add(id => {
      return request(options);
    });
  });
  rd.on('close', function() {
    q.start().then(results => {
      results.forEach(res => {
        console.log('Delete: ' + res);
      });
    });
  });
}