var fs = require('fs');
var request = require('request');
var tasks = require('./tasks.js').tasks;
var host = 'https://build-to-fix-staging.tilestream.net';
var flag = 0;
var errores = 0;

function upload(task) {
  console.log('creating :' + task.name);
  if (tasks[flag]) {
    var formData = {
      name: task.name,
      description: task.description,
      changesetComment: task.changesetComment,
      file: fs.createReadStream(task.file),
      password: process.argv[2]
    };
    request.post({
      url: host + '/tasks',
      formData: formData
    }, function(err, res) {
      // console.log(res)
      if (res.statusCode == 200) {
        flag++;
        console.log(tasks[flag]);
        upload(tasks[flag]);
      } else {
        console.log(err);
        if (errores < 4) {
          upload(tasks[flag]);
          errores++;
        } else {
          return;
        }
      }
    });
  } else {
    console.log('completed');
  }

}

upload(tasks[flag]);