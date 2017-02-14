var fs = require('fs');
var request = require('request');
var d3 = require('d3-queue');
var token = process.env.token;

var tasksBases = ['tigerdelta',
  'vegetationbrokenrelation',
  'conservationbrokenrelationgs',
  'waterwaybrokenrelation',
  'miscellaneousbrokenrelation',
  'miscellaneousbrokenrelation',
];
module.exports = {
  import: function(host) {
    var q = d3.queue(1);
    var tasks;
    var users;
    //read users
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

    // create users
    q.defer(function(cb) {
      var num = 0;
      createUsers(users[num]);

      function createUsers(user) {
        console.log('CREATE USER : ' + user.id);
        request.post({
          url: host + '/create',
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

    // q.defer(function(cb) {
    //   var num = 0;
    //   createTasks(tasks[num]);

    //   function createTasks(task) {
    //     if (tasksBases.indexOf(task.idtask) < 0) {
    //       console.log('CREATE TASK:' + task.idtask);
    //       var formData = {
    //         name: task.value.name,
    //         description: task.value.description,
    //         changesetComment: task.value.changesetComment,
    //         file: fs.createReadStream('files/' + task.idtask + '.geojson')
    //       };
    //       request.post({
    //         url: host + '/tasks',
    //         formData: formData,
    //         auth: {
    //           'bearer': token
    //         }
    //       }, function(err, res) {
    //         if (err) console.log(err);
    //         num++;
    //         if (tasks.length > num) {
    //           console.log(res.body);
    //           createTasks(tasks[num]);
    //         } else {
    //           cb();
    //         }
    //       });
    //     } else {
    //       num++;
    //       createTasks(tasks[num]);
    //     }
    //   }
    // });



    q.await(function(error) {
      if (error) throw error;
      // console.log(tasks);
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