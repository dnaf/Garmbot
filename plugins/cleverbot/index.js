const debug = require("debug")("garmbot:module:cleverbot"),
	Discord = require("discord.js"),
	r = require("rethinkdb");
    cb = require("cleverbot.io");
    config = require("config");
module.exports = function(garmbot) {
    garmbot.addGuildPreperation(async (conn, dbName) => {
        await garmbot.createTableIfNotExists(dbName, "colorRoles");
    });
    garmbot.addCommand(["cleverbot"], async function(message, args) {
        let embed = new Discord.RichEmbed();
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            bot = new cb(config.get("cleverbot.user"), config.get("cleverbot.key"));
            bot.setNick(uuid.v4());
            bot.create(function (err, session) {
                // session is your session name, it will either be as you set it previously, or cleverbot.io will generate one for you

                // Woo, you initialized cleverbot.io.  Insert further code here
            });
            //bot.setNick(uuid.v4());
            //cleverbotEnabled = true;
            embed.setTitle("Cleverbot is active");
            embed.setColor(0xffac33);
            embed.setDescription("You have started cleverbot!");
            embed.setThumbnail("https://i.imgur.com/SL3WwJo.png");
            return message.channel.sendEmbed(embed);
        }
        else {
            embed.setTitle("Error");
            embed.setDescription("You do not have permission to enable cleverbot");
            embed.setColor(0xff0000);
            embed.setThumbnail("https://i.imgur.com/Q0qnyNy.png")
            return message.channel.sendEmbed(embed);
        }
    });
    garmbot.addCommand(["csend"], async function(message, args) {
        if (bot)
            bot.ask(message, function(err, response){
                return message.channel.sendMessage(":speaking_head:" + response);
            });
    });
}