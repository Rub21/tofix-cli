var fs = require('fs');
var request = require('request-promise');
var turf = require('@turf/turf');
var BlueBirdQueue = require('bluebird-queue');
var sha1 = require('sha1');
var uuidv1 = require('uuid/v1');

var config = require('./config');
var token = process.env.token;
module.exports = {
  create: function(file, idProject) {
    var url = config.HOST + '/projects/' + idProject + '/items';
    console.log(url);
    var features = JSON.parse(fs.readFileSync(file)).features;
    var q = new BlueBirdQueue({
      concurrency: 5
    });
    var i = 0;
    features.forEach(feature => {
      var id = uuidv1();
      var props = {};
      for (var key in feature.properties) {
        props['string:' + key] = feature.properties[key];
      }
      feature.properties = props;
      feature.properties['tofix:category'] = 'devseed';
      var options = {
        method: 'POST',
        uri: url,
        body: {
          id: id,
          instructions: 'Fix the items',
          pin: turf.centroid(feature).geometry.coordinates,
          featureCollection: {
            type: 'FeatureCollection',
            features: [feature]
          },
          metadata: {}
        },
        json: true,
        headers: {
          'User-Agent': 'Request-Promise',
          Authorization: config.TOKEN
        }
      };
      q.add(id => {
        return request(options);
      });
    });
    q.start().then(results => {
      results.forEach(res => {
        console.log(res);
      });
    });
  },
  createItemFile: function(file, idProject) {
    var url = config.HOST + '/projects/' + idProject + '/items';
    console.log(url);
    var features = JSON.parse(fs.readFileSync(file)).features;
    var q = new BlueBirdQueue({
      concurrency: 5
    });
    var i = 0;
    features.forEach(feature => {
      var id = sha1(JSON.stringify(feature));
      var props = {};
      for (var key in feature.properties) {
        props['string:' + key] = feature.properties[key];
      }
      feature.properties = props;
      feature.properties['tofix:category'] = 'devseed';
      var options = {
        method: 'POST',
        uri: url,
        body: {
          id: id,
          instructions: 'Fix the items',
          pin: turf.centroid(feature).geometry.coordinates,
          featureCollection: {
            type: 'FeatureCollection',
            features: [feature]
          },
          metadata: {}
        },
        json: true,
        headers: {
          'User-Agent': 'Request-Promise',
          Authorization: config.TOKEN
        }
      };
      q.add(id => {
        return request(options);
      });
    });
    q.start().then(results => {
      results.forEach(res => {
        console.log(res);
      });
    });
  }
};
