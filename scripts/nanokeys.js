// Description:
//   create nanokeys users at api.cadeward.com
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot create nanokeys user <email>:<password> - Creates a user for api.cadeward.com

module.exports = function(robot) {
    robot.respond(/create nanokeys user (.*):(.*)$/i, function (msg) {
    	var email = msg.match[1]
    	var password = msg.match[2]

    	var data = JSON.stringify({
    		email: email,
    		password: password
    	});

    	msg.reply("I'm on it! I'll let you know when its done.")

    	msg.http("http://api.cadeward.com/users")
    	.header("Accept", "application/json")
    	.header("Content-Type", "application/json")
    	.post(data)(function (err, res, body) {
    		if (err) {
    			return msg.reply("I'm sorry, but it looks like there was an error with your request.")
    		}

    		if (res.statusCode == 201) {
    			return msg.reply("Your user has been created.")
    		} else {
    			return msg.reply("Sorry, we were unable to create your user. Try again later.")
    		}
    	});
    });
}