var itunes = require('playback');
itunes.on('playing', function(data){ console.dir(data);} );
itunes.on('paused', function(data){ console.log('paused');} );