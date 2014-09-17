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
    	return msg.http("http://api.nanokeys.impower.io/users").get(function (err, res, body) {
    		return msg.send(JSON.parse(body));
    	})
    });
}