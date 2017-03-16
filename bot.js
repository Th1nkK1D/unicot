let Discord = require('discord.io');
let youtubeStream = require('youtube-audio-stream')

let bot = new Discord.Client({
    autorun: true,
    token: "MjgwMzY4NzI2NTk0MDI3NTIw.C4IZjQ.Rtq9cQ-W0rD10GQhTc_QZ5HP5zA"
});

let voiceChannel = null;
let textChannel = null;

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
    if (message === ">>hi") {
        textChannel = channelID;

        //Let's join the voice channel, the ID is whatever your voice channel's ID is.
        bot.joinVoiceChannel(voiceChannel, function(error, events) {
            //Check to see if any errors happen while joining.
            if (error) return console.error(error);

            //Then get the audio context
            bot.getAudioContext(voiceChannel, function(error, stream) {
                //Once again, check to see if any errors exist
                if (error) return console.error(error);

                //Create a stream to your file and pipe it to the stream
                //Without {end: false}, it would close up the stream, so make sure to include that.
                var requestUrl = 'https://www.youtube.com/watch?v=WXmTEyq5nXc';

                try {
                    youtubeStream(requestUrl).pipe(stream,{end: false});
                } catch (exception) {
                    console.log(exception);
                }

                //The stream fires `done` when it's got nothing else to send to Discord.
                stream.on('done', function() {
                //Handle
                console.log("Done");
                });
            });
        });

        bot.sendMessage({
            to: channelID,
            message: "Yo, What's up?"
        });
    } else if(message === ">>bye") {
        bot.sendMessage({
            to: channelID,
            message: "Bye, dude"
        });

        joinStatus = false;

        bot.leaveVoiceChannel(voiceChannel);
    }
});