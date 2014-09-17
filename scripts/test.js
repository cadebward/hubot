// Description:
//   test script
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot test - returns a test

module.exports = function(robot) {
    robot.respond(/test$/i, function (msg) {
    	msg.reply("Why hello there, test command!")
    });
}