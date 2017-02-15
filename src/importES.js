var fs = require('fs');
var request = require('request');
var d3 = require('d3-queue');
var token = process.env.token;

var avoidTasks = ['tigerdelta',
  'vegetationbrokenrelation',
  'conservationbrokenrelationgs',
  'waterwaybrokenrelation',
  'miscellaneousbrokenrelation',
  'miscellaneousbrokenrelation'
];
module.exports = {
  import: function(host) {
    var q = d3.queue(1);
    var tasks;
    var users;
    var currentTaks;
    //create users
    q.defer(function(cb) {
      fs.readFile('users.json', 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        } else {
          users = JSON.parse(data).users;
          cb();
        }
      });
    });

    // // create users
    q.defer(function(cb) {
      var num = 0;
      createUsers(users[num]);

      function createUsers(user) {
        console.log('CREATE USER : ' + user.id);
        request.post({
          url: host + '/settings/create',
          formData: {
            index: 'tofix',
            type: 'users',
            id: user.id,
            obj: JSON.stringify(user)
          },
          auth: {
            'bearer': token
          }
        }, function(err, res) {
          if (err) console.log(err);
          console.log(res.statusCode);
          num++;
          if (users.length > num) {
            createUsers(users[num]);
          } else {
            cb();
          }
        });
      }
    });

    //List of tasks
    q.defer(function(cb) {
      fs.readFile('tasks.json', 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }
        tasks = JSON.parse(data);
        cb();
      });
    });
    //Dowload files
    // q.defer(function(cb) {
    // });

    // // create tasks
    q.defer(function(cb) {
      var num = 0;
      createTasks(tasks[num]);

      function createTasks(task) {
        if (avoidTasks.indexOf(task.idtask) < 0) {
          console.log('CREATE TASK:' + task.idtask);
          var formData = {
            name: task.value.name,
            description: task.value.description,
            changesetComment: task.value.changesetComment,
            file: fs.createReadStream('files/' + task.idtask + '.geojson')
          };
          request.post({
            url: host + '/tasks',
            formData: formData,
            auth: {
              'bearer': token
            }
          }, function(err, res) {
            if (err) console.log(err);
            num++;
            if (tasks.length > num) {
              console.log(res.body);
              createTasks(tasks[num]);
            } else {
              cb();
            }
          });
        } else {
          num++;
          createTasks(tasks[num]);
        }
      }
    });

    // //get current tasks
    q.defer(function(cb) {
      request.get({
        url: host + '/tasks'
      }, function(err, res) {
        if (err) console.log(err);
        currentTaks = JSON.parse(res.body).tasks;
        cb();
      });
    });

    // Update Tasks
    q.defer(function(cb) {
      var num = 0;
      updateTasks(tasks[num]);

      function updateTasks(task) {
        if (avoidTasks.indexOf(task.idtask) < 0) {
          console.log('UPDATE TASK:' + task.idtask);
          readfile('detail/' + task.idtask + '-detail.json', function(data) {
            for (var k = 0; k < currentTaks.length; k++) {
              if (data.idtask === currentTaks[k].idtask) {
                data.value.stats.push(currentTaks[k].value.stats);
              }
            }
            request.post({
              url: host + '/settings/update',
              formData: {
                index: 'tofix',
                type: 'tasks',
                id: task.idtask,
                obj: JSON.stringify(data)
              },
              auth: {
                'bearer': token
              }
            }, function(err, res) {
              if (err) console.log(err);
              console.log(res.statusCode);
              num++;
              if (tasks.length > num) {
                updateTasks(tasks[num]);
              } else {
                cb();
              }
            });
          });
        } else {
          num++;
          updateTasks(tasks[num]);
        }
      }
    });

    //update stats
    q.defer(function(cb) {
      var num = 0;
      updateStats(tasks[num]);

      function updateStats(task) {
        if (avoidTasks.indexOf(task.idtask) < 0) {
          console.log('UPDATE STATS:' + task.idtask);
          readfile('stats/' + task.idtask + '-stats.json', function(data) {
            request.post({
              url: host + '/settings/stats',
              formData: {
                index: 'tofix',
                type: task.idtask + '_trackstats',
                id: task.idtask + '_trackstats',
                obj: JSON.stringify(data)
              },
              auth: {
                'bearer': token
              }
            }, function(err, res) {
              if (err) console.log(err);
              console.log(res.statusCode);
              num++;
              if (tasks.length > num) {
                updateStats(tasks[num]);
              } else {
                cb();
              }
            });
          });
        } else {
          num++;
          updateStats(tasks[num]);
        }
      }
    });

    //update noterror
    q.defer(function(cb) {
      var num = 0;
      updatenoterror(tasks[num]);

      function updatenoterror(task) {
        if (avoidTasks.indexOf(task.idtask) < 0) {
          console.log('UPDATE NOTERROR:' + task.idtask);
          readfile('noterror/' + task.idtask + '-noterror.json', function(data) {
            request.post({
              url: host + '/settings/noterror',
              formData: {
                index: 'tofix',
                type: task.idtask + '_noterror',
                id: task.idtask + '_noterror',
                obj: JSON.stringify(data)
              },
              auth: {
                'bearer': token
              }
            }, function(err, res) {
              if (err) console.log(err);
              console.log(res.statusCode);
              num++;
              if (tasks.length > num) {
                updatenoterror(tasks[num]);
              } else {
                cb();
              }
            });
          });
        } else {
          num++;
          updatenoterror(tasks[num]);
        }
      }
    });

    q.await(function(error) {
      if (error) throw error;
      console.log('all was imported');
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

function readfile(path, done) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    done(JSON.parse(data));
  });
}