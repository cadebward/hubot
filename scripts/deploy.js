// Description:
//   deploy a project to production or staging
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot deploy [project]/[branch] to [staging|production] - deploys the project and branch to the specified environment

var config = require('config');

module.exports = function(robot) {
  robot.respond(/deploy (.*)\/(.*) to (.*)$/i, function (msg) {

    var project = msg.match[1];
    var branch = msg.match[2];
    var env = msg.match[3];

    if (env == 'production' || env == 'prod') {
      if (robot.auth.hasRole(msg.envelope.user, config.roles.production_role)) {
        production(project, branch, env, msg, robot);
      } else {
        msg.reply("You don't have access to deploy to production.")
      }
    } else if (env == 'staging' || env == 'stage') {
      staging(project, branch, env, msg, robot);
    } else {
      msg.reply('I don\'t recognize that environment. My options for deployment are staging(stage) or production(prod)');
    }
  });
}

function production(project, branch, env, msg, robot) {
  msg.reply("You've specified to deploy " + project + "/" + branch + " to " + env + ".")
};

function staging(project, branch, env, msg, robot) {
  msg.reply("You've specified to deploy " + project + "/" + branch + " to " + env + ".")
};

// robot.respond(/create nanokeys user (.*):(.*)$/i, function (msg) {

//  // check roles
//  if (robot.auth.hasRole(msg.envelope.user, "admin")) {
//    var email = msg.match[1]
//    var password = msg.match[2]

//    var data = JSON.stringify({
//      email: email,
//      password: password
//    });

//    msg.reply("I'm on it! I'll let you know when its done.")

//    msg.http("http://api.cadeward.com/users")
//    .header("Accept", "application/json")
//    .header("Content-Type", "application/json")
//    .post(data)(function (err, res, body) {
//      if (err) {
//        return msg.reply("I'm sorry, but it looks like there was an error with your request.")
//      }

//      if (res.statusCode == 201) {
//        return msg.reply("Your user has been created.")
//      } else {
//        return msg.reply("Sorry, we were unable to create your user. Try again later.")
//      }
//    });
//  } else {
//    msg.reply("Sorry, you don't have permission to create users")
//  }
// });