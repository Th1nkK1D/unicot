/* Unicot - Main bot 
 * https://github.com/Th1nkK1D/unicot
 * (c) Th1nk.K1D 2017
 */

import { Meteor } from 'meteor/meteor';
import { Queue } from '../imports/queue.js';

import token from '../imports/token.js';

if(Meteor.isServer) {
    const Discord = require('discord.js');
    const ytdl = require('ytdl-core');
    let ngrok = require('ngrok');
    let Fiber = Npm.require('fibers');

    const client = new Discord.Client();

    //Default stream setting
    let streamSetting = { seek: 0, volume: 0.1 };

    //Init global variable
    voiceChannel = null;
    voiceConnection = null;
    dispatcher = null;
    tunnelUrl = null;

    // Discord bot preparation
    client.on('ready', () => {
        console.log('Unicot is ready!');
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

                            console.log("Unicot web interface is running at: "+url);

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
                //Clear dispatcher
                if(dispatcher != null) {
                    dispatcher.end();
                    dispatcher = null;
                }

                //Leave voiceChannel
                voiceChannel.leave();
                voiceChannel = null;

                //Close ngrok
                ngrok.disconnect();
                tunnelUrl = null;

                console.log("disconnected");
            } else {
                m.reply("You didn't say '>>hi' to me yet, aren't you?");
            }
        }

    });

    //Start the bot
    client.login(token);

    //Reset currentSong playing status  
    let currentSong = Queue.findOne({});

    if(typeof currentSong != 'undefined' && currentSong.status != "queued") {
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

            currentSong = Queue.findOne({});
        }
    }

    //Play Stream
    function playStream(vid) {
        if(dispatcher == null) {
            let fiber = Fiber.current;

            //Stream song
            let stream = ytdl('https://www.youtube.com/watch?v='+vid, {filter : 'audioonly'});
            dispatcher = voiceConnection.playStream(stream,streamSetting);

            console.log("playing "+vid);

            //Triggered when current stream ended
            dispatcher.on('end',function(currentSong) {
                if(dispatcher != null) {
                    fiber.run();
                }
            });

            return Fiber.yield();            
        }
    }

    // Meteor Methods called from front-end
    Meteor.methods({
        //Add new song
        'add': function(vid,title) {
            Queue.insert({
                "vid": vid,
                "title": title,
                "status": "queued",
                "date": new Date()
            });
        },
        //Play or resume
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
        //Skip current song
        'skip': function() {
            if(dispatcher != null) {
                dispatcher.end();
                dispatcher = null;

                console.log("skip");
            }
        },
        //Pause current song
        'pause': function() {
            if(dispatcher != null) {
                dispatcher.pause();

                let currentSong = Queue.findOne({});
                Queue.update({"_id":currentSong._id},{$set:{"status": "pause"}});

                console.log("pause");
            }
        },
        //Stop music, clear queue
        'stop': function() {
            if(dispatcher != null) {
                Queue.remove({});
                dispatcher.end();

                console.log("stop");
            }
        },
        //Remove song from queue
        'remove': function(id) {
            Queue.remove({"_id": id});
        },
        //Adjust volume up
        'volumeUp': function() {
            if(dispatcher != null && streamSetting.volume < 2) {
                streamSetting.volume += 0.02;
                dispatcher.setVolume(streamSetting.volume);

                console.log("volume up");
            }
        },
        //Adjust volume down
        'volumeDown': function() {
            if(dispatcher != null && streamSetting.volume > 0) {
                streamSetting.volume -= 0.02;
                dispatcher.setVolume(streamSetting.volume);

                console.log("volume down");
            }
        }
    })
}