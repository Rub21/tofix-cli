var fs = require('fs');
var request = require('request');
var token = process.env.token;
module.exports = {
  replacetask: function(host, idtask) {
    console.log('SETTING TASK :' + host + '/tasks');
    var task = {
      "idtask": "tigerdeltauadtb",
      "isCompleted": true,
      "isAllItemsLoad": true,
      "value": {
        "name": "Tiger delta",
        "description": "Detection of tiger delta for main cities in the United States",
        "updated": 1483388084,
        "changesetComment": "Aligning or naming imported tiger roads #to-fix",
        "stats": [{
          "date": 1483388084,
          "edit": 125461,
          "fixed": 38158,
          "skip": 480,
          "type": "tigerdeltauadtb",
          "items": 122175,
          "noterror": 84017
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
      url: host + '/setting/tasks',
      formData: formData,
      auth: {
        'bearer': token
      }
    }, function(err, res) {
      if (err) console.log(err);
      console.log(res.body);
    });
  },

  updateNoterror: function(host, idtask, file) {
    var ids = JSON.parse(fs.readFileSync(file, 'utf8'));
    var formData = {
      index: 'tofix',
      type: idtask + '_noterror',
      id: idtask,
      obj: JSON.stringify(ids)
    };
    request.post({
      url: host + '/setting/items',
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