    playQueue = [];

    //Dequeue Song
    function getNextSong() {
        console.log("dequeue start");
        //let currentSong = {"url":"https://www.youtube.com/watch?v=tPEE9ZwTmy0"};
        //console.log(playQueue);

        if(playQueue.length > 0) {
            //Play Stream
            playStream(playQueue[0]);
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
                    console.log("Stream end");
                    //Remove from queue
                    console.log(currentSong);

                    playQueue.splice(0,1);

                    dispatcher = null;
                    getNextSong();
                }
            })
        }
    }