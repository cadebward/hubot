// Description:
//   remove a project from an environment
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot remove [project] from [env] - Removes the project from the specified environment

var config = require('config');
var api = config.api.protocol + '://' + config.api.domain + ':' + config.api.port;
var possible_words = ['docker'];

module.exports = function(robot) {
  robot.respond(/remove (.*) from (.*)$/i, function (msg) {

    var project = msg.match[1].toLowerCase();
    var env = msg.match[2].toLowerCase();

    if (!find(env, possible_words)) {
      msg.reply('Sorry, I don\'t recognize "' + env + '".');
    } else {
      sendRequest(project, env, msg, robot);
    }
  });
}

function sendRequest(project, env, msg, robot) {
  msg.reply('Removing ' + project + " from " + env + ". I'll let you know when it's done.")

  // setup data
  var data = JSON.stringify({
    "project": project,
    "env": env
  });

  msg.http(api + '/remove')
  .header("Accept", "application/json")
  .header("Content-Type", "application/json")
  .post(data)(function (err, res, body) {
    if (err) {
      msg.reply("Sorry, looks like there was an error with your request.");
    }

    var data = JSON.parse(body);

    if (data.success) {
      msg.reply(project + ' has been removed.');
    } else {
      msg.reply(data.message);
    }
  });
};

function find(key, array) {
  var results = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i].indexOf(key) == 0) {
      results.push(array[i]);
    }
  }
  if (results.length > 0) {
    return true;
  } else {
    return false;
  }
}