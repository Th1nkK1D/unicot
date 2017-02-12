let itunes = require('playback');
let Discord = require('discord.io');
let bot = new Discord.Client({
    autorun: true,
    token: "MjgwMzY4NzI2NTk0MDI3NTIw.C4IZjQ.Rtq9cQ-W0rD10GQhTc_QZ5HP5zA"
});

let voiceChannel = null;
let textChannel = null;
let joinStatus = false;

bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);

    //Find voice channel
    for(let channel in bot.channels) {
        if(bot.channels.hasOwnProperty(channel)) {
            if(bot.channels[channel].type == 'voice') {
                voiceChannel = channel;
                break;
            }
        }
    }
});


bot.on('message', function(user, userID, channelID, message, event) {
    if (message === ">>wakeup") {
        textChannel = channelID;

        //Join voice channel
        bot.joinVoiceChannel(voiceChannel);
        joinStatus = true;

        bot.sendMessage({
            to: channelID,
            message: "Yo, What's up?"
        });
    } else if(message === ">>sleep") {
        bot.sendMessage({
            to: channelID,
            message: "Bye, dude"
        });

        joinStatus = false;

        bot.leaveVoiceChannel(voiceChannel);
    }
});

//iTune playing event
itunes.on('playing', function(data) {
    if(textChannel != null) {
        //Get music path
        let path = data.location.slice(data.location.indexOf(':'),data.location.length).replace(/:/g,"/");
        bot.sendMessage({
            to: textChannel,
            message: path
        });

        console.log(data);
    }
});
itunes.on('paused', function(data){ console.log('paused');} );