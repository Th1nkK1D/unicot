let fs = require('fs');
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
        let path = 'zenzenzense.mp3';
        if (fs.existsSync(path)) {
            console.log('FOUND');
        }

        //Join voice channel
        bot.joinVoiceChannel(voiceChannel, function(error, events) {
            //Check to see if any errors happen while joining.
            if (error) return console.error(error);

            bot.getAudioContext(voiceChannel, function(error, stream) {
                //Once again, check to see if any errors exist
                if (error) return console.error(error);

                //Create a stream to your file and pipe it to the stream
                //Without {end: false}, it would close up the stream, so make sure to include that.
                fs.createReadStream(path).pipe(stream, {end: false});

                //The stream fires `done` when it's got nothing else to send to Discord.
                stream.on('done', function() {
                //Handle
                console.log("DONE");
                });
            });

        });

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
    if(voiceChannel != null) {
        //Get music path
        let path = data.location.slice(data.location.indexOf(':'),data.location.length).replace(/:/g,"/");

        if (fs.existsSync(path)) {
            console.log('FOUND');
        }
            //Then get the audio context
            bot.getAudioContext(voiceChannel, function(error, stream) {
                //Once again, check to see if any errors exist
                if (error) return console.error(error);

                //Create a stream to your file and pipe it to the stream
                //Without {end: false}, it would close up the stream, so make sure to include that.
                fs.createReadStream('./').pipe(stream);

                //The stream fires `done` when it's got nothing else to send to Discord.
                stream.on('done', function() {
                //Handle
                console.log("DONE");
                });
            });
    }
});

itunes.on('paused', function(data){ console.log('paused');} );