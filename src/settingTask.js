var fs = require('fs');
var request = require('request');
var token = process.env.token;
module.exports = {
  replacetask: function(host, idtask) {
    console.log('SETTING TASK :' + host + '/tasks');
    var task = {
      "idtask": "tigerdeltauadtb",
      "isCompleted": false,
      "isAllItemsLoad": true,
      "value": {
        "name": "Tiger delta",
        "description": "Detection of tiger delta for main cities in the United States",
        "updated": 1483388084,
        "changesetComment": "Aligning or naming imported tiger roads #to-fix",
        "stats": [{
          "date": 1483388084,
          "edit": 117090,
          "fixed": 36306,
          "skip": 469,
          "type": "tigerdeltauadtb",
          "items": 126981,
          "noterror": 77670
        }]
      },
      "iduser": "1781294"
    };
    var formData = {
      index: 'tofix',
      type: 'tasks',
      id: idtask,
      obj: JSON.stringify(task)
    };
    request.post({
      url: host + '/settingtask',
      formData: formData,
      auth: {
        'bearer': token
      }
    }, function(err, res) {
      if (err) console.log(err);
      console.log(res.body);
    });
  }
};