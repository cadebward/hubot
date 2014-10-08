// Description:
//   update a project to production or staging
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot update [project]/[branch] on [env] - Updates the project and branch on the specified environment (must have been deployed previously)

var config = require('config');
var api = config.api.protocol + '://' + config.api.domain + ':' + config.api.port;
var possible_words = ['docker'];

module.exports = function(robot) {
  robot.respond(/update (.*)\/(.*) on (.*)$/i, function (msg) {

    var project = msg.match[1].toLowerCase();
    var branch = msg.match[2].toLowerCase();
    var env = msg.match[3].toLowerCase();

    if (!branch || !env) {
      msg.reply('Did you forget to name a branch?');
    }

    if (!find(env, possible_words)) {
      msg.reply('Sorry, I don\'t recognize "' + env + '".');
    } else {
      sendRequest(project, branch, env, msg, robot);
    }
  });
}

function sendRequest(project, branch, env, msg, robot) {
  msg.reply('Updating ' + project + "/" + branch + " on " + env + ".")

  // setup data
  var data = JSON.stringify({
    "project": project,
    "branch": branch,
    "env": env
  });

  msg.http(api + '/update')
  .header("Accept", "application/json")
  .header("Content-Type", "application/json")
  .post(data)(function (err, res, body) {
    if (err) {
      msg.reply("Sorry, looks like there was an error with your request.");
    }

    var data = JSON.parse(body)

    if (res.statusCode == 200) {
      msg.reply(project + ' has been updated. You can see it at ' + data.subdomain + '.' + data.domain + ' or ' + data.ip + ':' + data.port);
    } else {
      msg.reply("Sorry, I was unable to update your project. " + data.message);
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