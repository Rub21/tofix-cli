var fs = require('fs');
var request = require('request-promise');
var turf = require('@turf/turf');
var BlueBirdQueue = require('bluebird-queue');
var sha1 = require('sha1');

var config = require('./config')
var token = process.env.token;
module.exports = {
	create: function(file, idProject) {
		var features = JSON.parse(fs.readFileSync(file)).features;
		const q = new BlueBirdQueue({
			concurrency: 5
		});


		features.forEach(feature => {
			console.log(feature)
			var id = sha1(JSON.stringify(feature));
			feature.properties['tofix:category'] = 'to-fix'
			var options = {
				method: 'POST',
				uri: config.HOST + '/projects/' + idProject + '/items',
				body: {
					"id": id,
					"instructions": "Fix the items",
					"pin": turf.centroid(feature).geometry.coordinates,
					"featureCollection": {
						"type": "FeatureCollection",
						"features": [feature]
					},
					"metadata": {}
				},
				json: true,
				headers: {
					'User-Agent': 'Request-Promise',
					'Authorization': config.TOKEN
				}
			};

			q.add((id) => {
				return request(options);
			})
		});
		q.start().then((results) => {
			results.forEach((res) => {
				console.log('=========')
				console.log(res)
			});

		});

	}

};