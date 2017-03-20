import { Meteor } from 'meteor/meteor';

   // Meteor Methods called from front-end
    Meteor.methods({
        'add': function(url) {
            Queue.insert({
                "url": url,
                "date": new Date()
            });

            playQueue.push({})
        },
        'play': function() {
            if(voiceConnection != null) {
                if(dispatcher == null) {
                    //No song playing
                    playQueue = Queue.find({}).fetch();

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