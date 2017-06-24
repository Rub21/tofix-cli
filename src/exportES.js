var fs = require('fs');
var request = require('request');
var d3 = require('d3-queue');
var token = process.env.token;

module.exports = {
  export: function(host) {
    var q = d3.queue(1);
    var tasks;
    fs.existsSync('noterror') || fs.mkdirSync('noterror');
    fs.existsSync('tasks') || fs.mkdirSync('tasks');
    fs.existsSync('activity') || fs.mkdirSync('activity');
    fs.existsSync('detail') || fs.mkdirSync('detail');
    fs.existsSync('stats') || fs.mkdirSync('stats');
    fs.existsSync('files') || fs.mkdirSync('files');

    //List of tasks
    q.defer(function(cb) {
      listTasks(host, function(resp) {
        tasks = JSON.parse(resp).tasks;
        cb();
      });
    });

    //Dowload not error acctions in the Tasks
    q.defer(function(cb) {
      var num = 0;
      downloadNoterror(tasks[num]);

      function downloadNoterror(task) {
        console.log('DOWNLOAD TASK NOT ERROR ACTIONS:' + task.idtask);
        request.get({
          url: host + '/tasks/' + task.idtask + '/items/action/noterror'
        }, function(err, noterroitemsResp) {
          if (err) console.log(err);
          var arr = '[]';

          if (noterroitemsResp.statusCode === 200 && JSON.parse(noterroitemsResp.body)[0] !== 'undefined') {
            arr = JSON.parse(noterroitemsResp.body);
          }

          writeFile('noterror/' + task.idtask + '-noterror.json', arr, function() {
            num++;
            if (tasks.length > num) {
              downloadNoterror(tasks[num]);
            } else {
              console.log('not error ok');
              cb();

            }
          });
        });
      }
    });

    //download stats
    q.defer(function(cb) {
      var num = 0;
      downloadTaskStats(tasks[num]);

      function downloadTaskStats(task) {
        console.log('DOWNLOAD TASK STATS:' + task.idtask);
        request.get({
          url: host + '/tasks/' + task.idtask + '/track_stats/from:2016-01-01/to:2017-12-31'
        }, function(err, statsReso) {
          if (err) console.log(err);
          writeFile('stats/' + task.idtask + '-stats.json', JSON.parse(statsReso.body), function() {
            num++;
            if (tasks.length > num) {
              downloadTaskStats(tasks[num]);
            } else {
              console.log('ok stats');
              cb();

            }
          });
        });
      }
    });

    //download activity
    q.defer(function(cb) {
      var num = 0;
      downloadActivity(tasks[num]);

      function downloadActivity(task) {
        console.log('DOWNLOAD TASK ACTIVITY :' + task.idtask);
        request.get({
          url: host + '/tasks/' + task.idtask + '/activity'
        }, function(err, activityResp) {
          if (err) console.log(err);
          writeFile('activity/' + task.idtask + '-activity.json', JSON.parse(activityResp.body), function() {
            num++;
            if (tasks.length > num) {
              downloadActivity(tasks[num]);
            } else {
              console.log('ok activity');
              cb();
            }
          });
        });
      }
    });

    // download users
    q.defer(function(cb) {
      request.get({
        url: host + '/users?token=' + token,
      }, function(err, res) {
        if (err) console.log(err);
        writeFile('users.json', JSON.parse(res.body), function() {
          cb();
        });
      });
    });


    //Downlaad detail for each task
    q.defer(function(cb) {
      var num = 0;
      downloadTaskDetail(tasks[num]);

      function downloadTaskDetail(task) {
        console.log('DOWNLOAD TASK DETAILS:' + task.idtask);
        request.get({
          url: host + '/tasks/' + task.idtask
        }, function(err, detailResp) {
          if (err) console.log(err);
          var taskDetail = JSON.parse(detailResp.body);
          taskDetail.idtask = task.idtask;
          writeFile('detail/' + task.idtask + '-detail.json', taskDetail, function() {
            num++;
            if (tasks.length > num) {
              downloadTaskDetail(tasks[num]);
            } else {
              console.log('details ok');
              cb();
            }
          });
        });
      }
    });

    //Save list of tasks
    q.defer(function(cb) {
      writeFile('tasks.json', tasks, function() {
        cb();
      });
    });

    q.await(function(error) {
      if (error) throw error;
      console.log('all was exported');
    });
  }
};

function listTasks(host, done) {
  console.log('LIST TASK :' + host + '/tasks');
  request.get({
    url: host + '/tasks'
  }, function(err, res) {
    if (err) console.log(err);
    done(res.body);
  });
}

function writeFile(namefile, obj, done) {
  fs.writeFile(namefile, JSON.stringify(obj), function(err) {
    done();
  });
}