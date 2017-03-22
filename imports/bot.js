import { Meteor } from 'meteor/meteor';
import { Queue } from '../imports/queue';

if(Meteor.isServer) {
    const Discord = require('discord.js');
    const ytdl = require('ytdl-core');

    const token = 'MjgwMzY4NzI2NTk0MDI3NTIw.C6wpWw.f-ruHdcIvvv-5STgBUNb4AOvjwo';
    const client = new Discord.Client();

    let streamSetting = { seek: 0, volume: 0.1 };

    voiceChannel = null;
    voiceConnection = null;
    dispatcher = null;

    // Discord bot preparation
    client.on('ready', () => {
    console.log('Unicot is running!');
    });

    client.on('message', m => {
        if (m.content === '>>hi') {
            if(voiceChannel == null) {
                //Get voiceChannel
                voiceChannel = client.channels.find(channel => channel.type === 'voice');

                //Join voiceChannel
                voiceChannel.join()
                    .then(connection => {
                        voiceConnection = connection;
                    })
                    .catch(console.error);
            }
        } else if(m.content === '>>bye') {
            if(voiceChannel != null) {
                //Leave voiceChannel
                voiceChannel.leave();
                voiceChannel = null;
            }
        }

    });

    client.login(token);

    //Dequeue Song
    function getNextSong() {
        console.log("getNextSong started");
        currentSong = Queue.findOne({});
        //let currentSong = {"url":"https://www.youtube.com/watch?v=tPEE9ZwTmy0"};
        console.log("Got next song: "+currentSong.url);

        if(typeof currentSong != 'undefined') {
            //Play Stream
            playStream(currentSong);
        }
    }

    //Play Stream
    function playStream(currentSong) {
        if(dispatcher == null) {
            //stream song
            let stream = ytdl(currentSong.url, {filter : 'audioonly'});
            dispatcher = voiceConnection.playStream(stream,streamSetting);

            console.log("playing "+currentSong.url);

            dispatcher.on('end',function(currentSong) {
                if(dispatcher != null) {
                    console.log("Stream ended");
                    //Remove from queue
                    //currentSong = Queue.remove(currentSong);
                    console.log("Song removed");

                    dispatcher = null;
                    getNextSong();
                }
            })
        }
    }

       // Meteor Methods called from front-end
    Meteor.methods({
        'add': function(vid,title) {
            Queue.insert({
                "vid": vid,
                "title": title,
                "status": "queued",
                "date": new Date()
            });

            playQueue.push({})
        },
        'play': function() {
            if(voiceConnection != null) {
                if(dispatcher == null) {
                    //No song playing
                    getNextSong();
                } else {
                    //Song is paused
                    dispatcher.resume();
                }
            }
        },
        'skip': function() {
            if(voiceConnection != null) {
                dispatcher = null;
                getNextSong();
            }
        },
        'pause': function() {
            if(voiceConnection != null) {
                dispatcher.pause();
            }
        },
        'remove': function(id) {
            console.log("removing");
        }
    })
}