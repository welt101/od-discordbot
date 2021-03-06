// OD Bot - by welt101 - opendriving.tk
var Discord = require('discord.js');
var bot = new Discord.Client();
var version = "0.1.6c"

function userInfo(user) {
    try {
    var uc = user.createdAt.toString().split(" ");
    var str = "**" + user.username + "** (ID: *" + user.id + "*) was created on **" + uc[1] + " " + uc[2] + ", " + uc[3] + "**.";
    return str;
    }catch(err){
        return "**User *" + user + "* was not found on this server :(!**";
    }   
}

function getMoney(user) {
    var map = {
        "welt101": "1,251,017",
        "ThePolice007": "281,102",
        "junior999log": "999,999,999"
    }
    if (map[user]) {
        return map[user]
    }else if (user == '') {
        return '*User not found!*'
    }else{
        return 500
    }
}

bot.on('message',message => {
       var sender = message.author;
       var msg = message.content.toUpperCase();
       var prefix = "+";

       let textargs = message.content.split(" ").slice(1);
       let cmdargs = message.content.split(" ").slice(2);
     
    if (msg === prefix + 'PING') {
        message.channel.send('Pong!');
    } else if (msg === prefix + 'VERSION') {
        message.channel.send('[Debug] Currently running on version ' + version);
    } else if (msg === prefix + 'APPLY') {			
        message.channel.send(sender+' You may apply here: http://opendriving.tk/applynow');
    } else if (msg === prefix + 'WHOAMI') {
         message.channel.send('You are '+sender + ' ');  
    } else if (msg === prefix + 'WIKI') {
            message.channel.send('Our Wiki can be found here: **http://opendriving.wikia.com**');  
    } else if (msg === prefix + 'REPORT') {
         message.channel.send('Hi ' + sender + '! If you want to report someone, click here: http://opendriving.tk/feedback2/'); 
    } else if (msg === prefix + 'WEBSITE') {
         message.channel.send(sender + ' Our website -> http://www.opendriving.tk');    
    } else if ((msg === prefix + 'FORUM')||(msg === prefix + "SUPPORT")) {
            message.channel.send(sender + ' Our website -> http://www.opendriving.tk');    
    } else if (msg === prefix + 'HELP') {
        message.delete();
        const embed = new Discord.RichEmbed()
       .setColor(0x00AE86)
       .setTitle("Help for OD Bot")
       .setDescription('I\'m a bot developed by **welt101#5653**.\n\n [ Available commands ]\n\n**+play**/**+games** - Shows a list of our games\n**+wiki** - Opens our wiki\n**+forum**/**+support** - Opens our support site\n**+whoami** - Who am I?\n**+apply** - Use this cmd if you want to apply.\n**+report** - Report a player.\n**+website** - Open our website.\n**+afk** - Change your status to *afk*.\n**+unafk** - Change your status back to normal.\n**+userinfo** - Information about you.\n\n [ IN-GAME commands across all games (**WIP**) ]\n\n**+money [USERNAME]** - Returns the money the user has.\n**+miles [USERNAME]** - Returns the amount of miles the user has driven.');
      
       message.channel.send({embed});   
    } else if (msg.startsWith(prefix + 'MONEY')) {   
        message.delete();
        const text = textargs.join(" ");
        const _b = getMoney(text);
        const _c = "\nCouldn't fetch response stream.\n at root\\OpenDriving\\mainlogic\\int\\bot.js:219\n at GET opendriving.tk/db/API/?getMoney=" + text + "/ \n\n--> Server did not return exactly one value.";
        const embed = new Discord.RichEmbed()            
        .setColor(3447003)
        .setTitle("")
        .setDescription('**' + text + '\'s** Cash in Open Driving:\n  ' + _b + ' $');
        message.channel.send({embed})
    } else if (msg.startsWith(prefix + 'MILES')) {
        message.delete(); 
        const embed = new Discord.RichEmbed()            
        .setColor(0xFF0000)
        .setTitle("*Coming Soon :tm:*")
        .setDescription("Really soon..");
        message.channel.send({embed})
    } else if ((msg === prefix + 'LIST')||(msg === prefix + 'GAMES')||(msg === prefix + 'PLAY')) {
        message.channel.send('A complete list of our games can be found here: http://opendriving.wikia.com/Games');
    } else if (msg.startsWith(prefix + 'WARN')) {
        message.delete();
        const text = textargs.join(" ");
        const embed = new Discord.RichEmbed()            
        .setColor(0xFF0000)
        .setTitle("[ WARNING ]")
        .setDescription('You have been warned, ' + text + '! Please follow the **#guidelines**.');
        message.channel.send({embed})
    } else if (msg.startsWith(prefix + 'WWARN')) {
            message.delete(); 
            const embed = new Discord.RichEmbed()            
            .setColor(0xFF0000)
            .setTitle("[ WARNING: " + textargs.slice(1) + " ]")
            .setDescription(cmdargs);
            message.channel.send({embed})
    } else if (msg.startsWith(prefix + 'AMSG')) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            message.delete();
            const text = textargs.join(" ");
            const embed = new Discord.RichEmbed()            
            .setColor(0xFF0000)
            .setTitle("Important Announcement")
            .setDescription(text);
            message.channel.send({embed})
        }
    } else if (msg === prefix + 'EVERYONE') {
        message.delete();
        if (message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send('@everyone');
        } 
    } else if (msg === prefix + 'AFK') {
        message.delete();
        message.channel.send(sender + ' is now AFK :sleeping: .');
    } else if (msg === prefix + 'UNAFK') {
        message.delete();
        message.channel.send(sender + ' is no longer AFK :smile: .');
    } else if (msg.startsWith(prefix + 'UPD')) {
        message.delete();
        const text = textargs.join(" ");
        const embed = new Discord.RichEmbed()            
        .setColor(0x0000FF)
        .setTitle("Update")
        .setDescription(text);
        message.channel.send({embed})
    } else if (msg.startsWith(prefix + 'USERINFO')) {
        if(msg === prefix + 'USERINFO') {
            message.channel.send(userInfo(sender));
        }else{
            const otheruser = textargs.join("  ");
            message.channel.send(userInfo(textargs));
        }
    } else if ((msg === prefix)||(msg.startsWith(prefix))) {
        message.channel.send('*Invalid command! Use **+help** for help.*');
    }
});

bot.on('guildMemberAdd', member => {
    console.log(member + ' >> joined')
    var role = member.guild.roles.find('name', 'Fans');
    member.addRole(role)
});                                             

bot.on('ready', () => {
    console.log('OD-Bot: I\'m ready!')
    bot.user.setStatus('Online')
    bot.user.setPresence({ game: { name: 'say +help', type: 0 } });
});

bot.login(process.env.BOT_TOKEN);
