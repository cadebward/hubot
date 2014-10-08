// Description:
//   changes the music
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot (pianobar|pb) (toggle|pp) - toggle between pause or play
//   hubot (pianobar|pb) (next|n) - skip current sont
//   hubot (pianobar|pb) (like|l) - like the current song
//   hubot (pianobar|pb) (unlike|u) - unlike the current song

var config = require('config');
var api = config.api.protocol + '://' + config.api.domain + ':' + config.api.port;

module.exports = function(robot) {
  robot.respond(/(pianobar|pb) (toggle|pp)$/i, function (msg) {
    sendRequest('toggle', msg, robot);
  });

  robot.respond(/(pianobar|pb) (next|n)$/i, function (msg) {
    sendRequest('next', msg, robot);
  });

  robot.respond(/(pianobar|pb) (like|l)$/i, function (msg) {
    sendRequest('like', msg, robot);
  });

  robot.respond(/(pianobar|pb) (unlike|u)$/i, function (msg) {
    sendRequest('unlike', msg, robot);
  });
}

function sendRequest(action, msg, robot) {

  // setup data
  var data = JSON.stringify({
    "project": "test"
  });

  msg.http(api + '/' + action)
  .header("Accept", "application/json")
  .header("Content-Type", "application/json")
  .post(data)(function (err, res, body) {
    if (err) {
      msg.reply("Sorry, looks like there was an error with your request.");
    }
  });
};