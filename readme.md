# Unicot
Discord music streaming bot with nice looking web user interface.

![Unicot](https://github.com/Th1nkK1D/unicot/blob/master/public/unicot_banner.jpg?raw=true)

### Main Features
- Stream any music from Youtube to your Discord voice channel.
- Manage queue and control the music from web interface.

### Set Up
1. Install [Meteor](https://www.meteor.com/install) and [ffmpeg](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-FFmpeg) if you haven't.
2. Download Unicot. You can either use git clone (if you have git) or you can choose "Download Zip" from the green button name "Clone or Download" above. If you download as zip, don't forget to extract it.
3. Create Discord bot, get a token and add it to your server by following this [guide](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
4. Inside Unicot directory, replace your token in */import/token.js* with any text editor.
5. Use your Command Line or Terminal to navigate to the Unicot directory and run command: _meteor_ to start the Unicot!

### How to use
1. Send the command _>>hi_ in your server text channels. Unicot will join the first voice channel it found and reply with the URL which you can access Unicot web interface.
2. To stop, send the command _>>bye_ in your server text channels. Unicot will stop web interface and leave the voice channel.

### Screenshot
![Unicot Screenshot](https://lh3.googleusercontent.com/whF-aDB4dumwaFF8p0-p8TPMeDxBMI8H9vxaHrOeqtbt5FN_pK8UaJiaUVbA4xmK_2YK5zsQDiSOqDA=w1273-h749-rw)

### Powered by
- [Meteor](https://www.meteor.com)
- [Discord.js](https://discord.js.org/)
- [Angular 1](https://angularjs.org)
- [Node Youtube Downloader](https://github.com/fent/node-ytdl-core)
- [ngrok](https://ngrok.com)

Tasty Code by © Th1nkK1D 2017