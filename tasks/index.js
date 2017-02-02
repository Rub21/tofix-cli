var fs = require('fs');
var request = require('request');
var tasks = JSON.parse(fs.readFileSync('tasks-production.json', 'utf8')).tasks;
var idtasks = [];
for (var i = 0; i < tasks.length; i++) {
  idtasks.push(tasks[i].idtask);
}
var index = 0;
function getNotError(idtask) {
  var url ='https://build-to-fix-production.mapbox.com/tasks/' + idtask + '/items/action/noterror';
  console.log(url);
  request.get({
    url: url
  }, function(err, res) {
    if (err) console.log(err);
    fs.writeFile(idtask + '.json', res.body, function(err) {
      if (err) {
        return console.log(err);
      } else {
        console.log("The file was saved!");
        index++;
        getNotError(idtasks[index]);
      }
    });
  });
}

getNotError(idtasks[index]);