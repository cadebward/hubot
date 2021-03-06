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
//   hubot deploy [project]/[branch] to [env] - Deploys the project and branch on the specified environment

var config = require('config');
var api = config.api.protocol + '://' + config.api.domain + ':' + config.api.port;
var possible_words = ['docker'];

module.exports = function(robot) {
  robot.respond(/deploy (.*)\/(.*) to (.*)$/i, function (msg) {

    var project = msg.match[1].toLowerCase();
    var branch = msg.match[2].toLowerCase();
    var env = msg.match[3].toLowerCase();

    if (!find(env, possible_words)) {
      msg.reply('Sorry, I don\'t recognize "' + env + '". I can only deploy to "docker" currently.');
    } else {
      sendRequest(project, branch, env, msg, robot);
    }
  });
}

function sendRequest(project, branch, env, msg, robot) {
  msg.reply('Deploying ' + project + "/" + branch + " on " + env + ". I'll let you know when it's done.")

  // setup data
  var data = JSON.stringify({
    "project": project,
    "branch": branch,
    "env": env
  });

  msg.http(api + '/deploy')
  .header("Accept", "application/json")
  .header("Content-Type", "application/json")
  .post(data)(function (err, res, body) {
    if (err) {
      msg.reply("Sorry, looks like there was an error with your request.");
    } 

    var data = JSON.parse(body)

    if (data.success) {
      msg.reply(project + ' has been deployed to ' + env + '. Its up at ' + data.subdomain + '.' + data.domain + ' or ' + data.ip + ':' + data.port);
    } else {
      msg.reply("Sorry, I was unable to deploy your project. " + data.message);
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