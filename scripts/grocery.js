// Description:
//   create grocery list
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot grocery add [item] - Add [item] to grocery list
//   hubot grocery list - List all items on grocery list
//   hubot grocery reset - Reset list after a shopping trip
//   hubot grocery remove [item] - Remove [item] from grocery list

var list = [];

module.exports = function(robot) {
  robot.respond(/grocery add (.*)$/i, function (msg) {
    var item = msg.match[1].toLowerCase();
    list.push(item);
    msg.reply('I\'ve added ' + item + ' to the grocery list.')
  });

  robot.respond(/grocery list$/i, function (msg) {
    if (list.length > 0) {
      var split_list = list.join(',')
      msg.reply('Items on the list: ' + split_list);
    } else {
      msg.reply('The list is currently emtpy.')
    }
  });

  robot.respond(/grocery reset$/i, function (msg) {
    list = [];
    msg.reply('I\'ve removed all items from the list.')
  });

  robot.respond(/grocery remove (.*)$/i, function (msg) {
    var item = msg.match[1].toLowerCase();
    var index = list.indexOf(item)
    if (index == -1) {
      msg.reply('I couldn\'t find ' + item + ' on the list.')
    } else {
      list.splice(index, 1)
      msg.reply('I removed ' + item + ' from the list.')
    }
  });
}