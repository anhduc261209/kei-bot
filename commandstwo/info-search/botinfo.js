const db = require("quick.db");
const Discord = require ("discord.js")
const { version } = require('../../package.json');
const ms = require('pretty-ms');
const { version: discordjsVersion } = require('discord.js');
module.exports = {

  name: "botinfo",

  category: "info",
    aliases: ['uptime', 'botstats', 'stats'],
    description: 'Check\'s bot\'s status',
  run: async (client, message, args, del, member) => {
   message.delete();
      message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${message.author.tag}`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addField('**• Version**', `1.0.0`, true)
            .addField(`**• Users**`, `${client.users.cache.size} users`, true)
            .addField('**• Servers**', `${client.guilds.cache.size} guilds`, true)
            .addField('**• Discord.js**', `13.2.0`, true)
            .addField('**• Ping**', `${client.ws.ping}ms`, true)
            .addField('**• Commands**', `${client.commands.size} cmds`,true)
            .addField('Important Links ','**• [Support](https://discord.gg/kB7ecN53u5)**  • **[Website](https://saturnbot.npgop.repl.co/)** ** • [Invite Me](https://discord.com/api/oauth2/authorize?client_id=903837785612484609&permissions=8&scope=bot%20applications.commands)**')

            .setTimestamp()
           .setFooter(
           `Saturn bot`,
            client.user.displayAvatarURL()  
      ))
         }
};
