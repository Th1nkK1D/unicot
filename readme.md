# Unicot
Discord music streaming bot with nice looking web user interface

![Unicot](https://github.com/Th1nkK1D/unicot/blob/master/public/unicot_banner.jpg?raw=true)

### Main Features
- Stream any music from Youtube to your Discord voice channel
- Manage queue and control the music from web interface

**NOTE**: Unicot is my experimental project. Bugs and instability is expected. If web interface isn't response, refreshing the page will mostly fix the problem. Feel free to report any bugs and use my code for non-profit purpose :)

### Set Up
1. Install [Meteor](https://www.meteor.com/install) and [ffmpeg](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-FFmpeg).
2. Download Unicot. You can either use git clone (if you have git) or you can choose "Download Zip" from the green button name "Clone or Download" above. If you download as zip, don't forget to extract it.
3. Create Discord bot, get a token and add it to your server by following this [guide](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
4. Inside Unicot directory, put your token in `/imports/token.js` inside the quote with any text editor.
5. Use your Command Line or Terminal to navigate to the Unicot directory and run `meteor npm install`
6. Wait until NPM finish the installation of all neccesary packages. Now Unicot is ready to use!

### How to use
1. In command line, go to Unicot directory and run command: `meteor` to start the Unicot server.
2. Send the command `>>hi` in your server text channel. Unicot will join the first voice channel it found and reply with the URL which you can access Unicot web interface.
3. To stop, send the command `>>bye` in your server text channel. Unicot will stop web service and leave the voice channel.

### Screenshot
![Unicot Screenshot](https://drive.google.com/uc?id=0ByEaNyGcU8cceExzWUY1TnZJUFE)

### Powered by
- [Meteor](https://www.meteor.com) + [Angular-Meteor](https://angular-meteor.com)
- [AngularJS 1](https://angularjs.org)
- [Discord.js](https://discord.js.org/)
- [Node Youtube Downloader](https://github.com/fent/node-ytdl-core)
- [Milligram](https://milligram.github.io)
- [Google Material Icons](https://material.io/icons/) + [Roboto Font](https://fonts.google.com/specimen/Roboto)
- [ngrok](https://ngrok.com)

![How Unicot work](https://drive.google.com/uc?id=0ByEaNyGcU8ccZG9oX2YtTk1nYzg)

Tasty Code by © Th1nk.K1D 2017