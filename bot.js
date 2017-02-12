let itunes = require('playback');
let Discord = require('discord.io');
let bot = new Discord.Client({
    autorun: true,
    token: "MjgwMzY4NzI2NTk0MDI3NTIw.C4IZjQ.Rtq9cQ-W0rD10GQhTc_QZ5HP5zA"
});

bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});


bot.on('message', function(user, userID, channelID, message, event) {
    if (message === ">>yo") {
        //Find voice channel
        for(let channel in bot.channels) {
            if(bot.channels.hasOwnProperty(channel)) {
                if(bot.channels[channel].type == 'voice') {
                    bot.joinVoiceChannel(channel,function(error) {
                        console.log(error);
                    });
                    break;
                }
            }
        }

        bot.sendMessage({
            to: channelID,
            message: "hi"
        });
    }
});

itunes.on('playing', function(data) {
    console.log(data);
});
itunes.on('paused', function(data){ console.log('paused');} );