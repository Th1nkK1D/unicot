const Discord = require('discord.js');
const youtubeStream = require('youtube-audio-stream')

const client = new Discord.Client();

let voiceChannel = null;

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', m => {
    if (m.content === 'hi') {
        if(voiceChannel == null) {
            //Get voiceChannel
            voiceChannel = client.channels.find(channel => channel.type === 'voice');

            //Join voiceChannel
            voiceChannel.join();
        }
    } else if(m.content === 'bye') {
        //Leave voiceChannel
        if(voiceChannel != null) {
            voiceChannel.leave();
            voiceChannel = null;
        }
    }

});

client.login('MjgwMzY4NzI2NTk0MDI3NTIw.C6wpWw.f-ruHdcIvvv-5STgBUNb4AOvjwo');