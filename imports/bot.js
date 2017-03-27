import { Meteor } from 'meteor/meteor';
import { Queue } from '../imports/queue';

if(Meteor.isServer) {
    const Discord = require('discord.js');
    const ytdl = require('ytdl-core');
    let ngrok = require('ngrok');

    let Fiber = Npm.require('fibers');

    const token = 'MjgwMzY4NzI2NTk0MDI3NTIw.C6wpWw.f-ruHdcIvvv-5STgBUNb4AOvjwo';
    const client = new Discord.Client();

    let streamSetting = { seek: 0, volume: 0.08 };

    voiceChannel = null;
    voiceConnection = null;
    dispatcher = null;
    tunnelUrl = null;

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

                        //Request ngrok
                        ngrok.connect(3000, function (err, url) {
                            if (err) {
                                console.log(err);
                            }

                            console.log("I'm running at: "+url);

                            m.reply("I'm running at: "+url);

                            tunnelUrl = url;
                        });
                    })
                    .catch(console.error);
            } else if(tunnelUrl != null) {
                m.reply("I'm already running at: "+tunnelUrl);
            }
        } else if(m.content === '>>bye') {
            if(voiceChannel != null) {

                if(dispatcher != null) {
                    dispatcher.end();
                }

                //Leave voiceChannel
                voiceChannel.leave();
                voiceChannel = null;

                //Close ngrok
                ngrok.disconnect();
                tunnelUrl = null;

                console.log("disconnected");
            }
        }

    });

    client.login(token);

    // Reset currentSong playing status  
    let currentSong = Queue.findOne({});

    if(currentSong.status != "queued") {
        Queue.update({"_id":currentSong._id},{$set:{"status": "queued"}})
    }

    //Playing start
    function playing() {
        let currentSong = Queue.findOne({});

        while(typeof currentSong != 'undefined' && currentSong != null) {
            Queue.update(currentSong,{$set:{"status":"playing"}});

            playStream(currentSong.vid);

            //Remove from queue
            dispatcher = null;
            Queue.remove({"_id": currentSong._id});
            //console.log("Song removed");

            currentSong = Queue.findOne({});
        }
    }

    //Play Stream
    function playStream(vid) {
        if(dispatcher == null) {
            let fiber = Fiber.current;

            //stream song
            let stream = ytdl('https://www.youtube.com/watch?v='+vid, {filter : 'audioonly'});
            dispatcher = voiceConnection.playStream(stream,streamSetting);

            console.log("playing "+vid);

            dispatcher.on('end',function(currentSong) {
                if(dispatcher != null) {
                    //console.log("Stream ended");
                    fiber.run();
                }
            });

            return Fiber.yield();            
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
        },
        'play': function() {
            if(voiceConnection != null) {
                if(dispatcher == null) {
                    //No song playing
                    playing();
                } else {
                    //Song is paused
                    dispatcher.resume();

                    let currentSong = Queue.findOne({});
                    Queue.update({"_id":currentSong._id},{$set:{"status": "playing"}});

                    console.log("resume");
                }
            }
        },
        'skip': function() {
            if(dispatcher != null) {
                dispatcher.end();
                dispatcher = null;

                console.log("skip");
            }
        },
        'pause': function() {
            if(dispatcher != null) {
                dispatcher.pause();

                let currentSong = Queue.findOne({});
                Queue.update({"_id":currentSong._id},{$set:{"status": "pause"}});

                console.log("pause");
            }
        },
        'stop': function() {
            if(dispatcher != null) {
                Queue.remove({});
                dispatcher.end();

                console.log("stop");
            }
        },
        'remove': function(id) {
            Queue.remove({"_id": id});
        },
        'volumeUp': function() {
            if(dispatcher != null && streamSetting.volume < 2) {
                streamSetting.volume += 0.02;
                dispatcher.setVolume(streamSetting.volume);

                console.log("volume up");
            }
        },
        'volumeDown': function() {
            if(dispatcher != null && streamSetting.volume > 0) {
                streamSetting.volume -= 0.02;
                dispatcher.setVolume(streamSetting.volume);

                console.log("volume down");
            }
        }
    })
}