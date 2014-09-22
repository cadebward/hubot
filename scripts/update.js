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
//   hubot update [project]/[branch] on [staging|production] - updates the project and branch on the specified environment (must have been deployed previously)

module.exports = function(robot) {
  robot.respond(/update (.*)\/(.*) on (.*)$/i, function (msg) {
    var project = msg.match[1];
    var branch = msg.match[2];
    var env = msg.match[3];

    if (env == 'production' || env == 'prod') {
      production(project, branch, env, msg, robot);
    } else if (env == 'staging' || env == 'stage') {
      staging(project, branch, env, msg, robot);
    } else {
      msg.reply('I don\'t recognize that environment. My options are staging(stage) or production(prod). Where else would you have deployed your project?');
    }
  });
}

function production(project, branch, env, msg, robot) {
  msg.reply("You've specified to update " + project + "/" + branch + " on " + env + ".")
};

function staging(project, branch, env, msg, robot) {
  msg.reply("You've specified to update " + project + "/" + branch + " on " + env + ".")
};