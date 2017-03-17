const Discord = require('discord.js');
const ytdl = require('ytdl-core')

const token = 'MjgwMzY4NzI2NTk0MDI3NTIw.C6wpWw.f-ruHdcIvvv-5STgBUNb4AOvjwo';
const client = new Discord.Client();

let voiceChannel = null;

client.on('ready', () => {
  console.log('Unicot is running!');
});

client.on('message', m => {
    if (m.content === 'hi') {
        if(voiceChannel == null) {
            //Get voiceChannel
            voiceChannel = client.channels.find(channel => channel.type === 'voice');

            //Join voiceChannel
            voiceChannel.join()
                .then(connection => {
                    const stream = ytdl('https://www.youtube.com/watch?v=WXmTEyq5nXc', {filter : 'audioonly'});
                    const dispatcher = connection.playStream(stream, { seek: 0, volume: 1 });
                })
                .catch(console.error);
        }
    } else if(m.content === 'bye') {
        if(voiceChannel != null) {
            //Leave voiceChannel
            voiceChannel.leave();
            voiceChannel = null;
        }
    }

});

client.login(token);