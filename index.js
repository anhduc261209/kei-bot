const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('bot online yay boy!!'))

app.listen(port, () =>
console.log(`Your app is listening a http://localhost:${port}`)
);
require("dotenv").config();


"$TOEKN"
// if you need help ask in the help channel dont dm me
const guildDB = require("./mongo/guildDB");
const { default_prefix } = require("./config.json")
const fetch = require("node-fetch");
const db =require("quick.db");
const moment = require("moment");
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();
const { emotes , emoji} =require("./config.json")
const { MessageMenuOption, MessageMenu } = require("discord-buttons")
const DiscordButtons = require('discord-buttons'); 
const { MessageEmbed } = require('discord.js')
const discord = require("discord.js");
const client = new discord.Client({
  disableEveryone: false
});
const button = require('discord-buttons');
const disbut = require("discord-buttons")
const colors = require('./colors.json')
const yts = require('yt-search')

client.queue = new Map();
client.vote = new Map();
const { ready } = require("./handlers/ready.js")

require("./database.js");
client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
client.queue = new Map()
process.on('unhandledRejection', console.error);

  
client.on("message", async message => {

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix is \`${default_prefix}\``);
  }
 

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(default_prefix)) return;

  if (!message.member)
    message.member = message.guild.fetchMember(message);

  const args = message.content
    .slice(default_prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});


/*client.on("guildMemberAdd", async member => {
  try {

  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {

    return;

  }
 let data = await canva.welcome(member, { link: "https://cdn.discordapp.com/attachments/815889737750544405/827575020338675822/welcome_imgae.png",blur: false }) 
   const attachment = new discord.MessageAttachment(

      data,

      "welcome-image.png"

    );
 client.channels.cache.get(chx).send(`Welcome to ${member.guild.name}, Server ${member.user}\nYou are our ${member.guild.memberCount}th Member. Enjoy `, attachment);*/

client.on("guildMemberAdd", async (member) => {
  try {
     console.log('test')
    let data = await guildDB.find({ guild: member.guild.id });
    var channel = data.map((guildDB) => {
        return [ `${guildDB.channel}` ]})
        console.log(channel)
    if (!channel) return console.log('no channel')
    // i think i almost got it right
    console.log('test')
    let message = data.map((guilDB) => { return [ `${guildDB.message}` ]});
    console.log('test')
    if (!message) message = "[member:mention] Welcome to [guild:name]";
    console.log(channel)
    console.log(message)
    //let mes = message.replace(/`?\[member:mention]`?/g, member.user).replace(/`?\[guild:name]`?/g, member.guild.name).replace(/`?\[guild:membercount]`?/g, member.guild.members.cache.size)
    let guildCh = client.guilds.cache.get(member.guild.id)
    let f = await guildCh.channels.cache.get(channel).send(message);
    console.log(f)
    setTimeout(async () => {
      await f.delete();
    }, 1000);
  client.channels.cache.get(chx).send("Welcome to our Server " + member.user.username, attachment);
  } catch (e) {
    console.log(e)
  }
});

  client.on("guildMemberAdd", async (member) => {
      let LoggingChannel = await db.get(`LoggingChannel_${member.guild.id}`);
  if (!LoggingChannel)return console.log(`Setup Is Not Done in ${member.guild.id} aka ${member.guild.name} Guild (channel not found)`);

  //getting notify role
  let notifyRole = await db.get(`notifyRole_${member.guild.id}`);
  if (!notifyRole)return console.log(`Setup Is Not Done in ${member.guild.id} aka ${member.guild.name} Guild (role not found)`);

  //to get created date in days format
  let x = Date.now() - member.user.createdAt;
  let created = Math.floor(x / 86400000);

  //creation date
  let creationDate = moment
    .utc(member.user.createdAt)
    .format("dddd, MMMM Do YYYY, HH:mm:ss");

  //joindate
  let joiningDate = moment
    .utc(member.joinedAt)
    .format("dddd, MMMM Do YYYY, HH:mm:ss");

  //joinposition
  let joinPosition = member.guild.memberCount

  //altdate
  let AltAge = await db.get(`altAge_${member.guild.id}`)
  if (!AltAge) return db.set(`altAge_${member.guild.id}`, 31)

  //only sends message when alt found
  if (created < AltAge) {
    //embed
    let altEmbed = //main alt message
    new Discord.MessageEmbed().setTitle("Alt Found!").setColor("RANDOM").setFooter("Bot Made By ItzCutePihcu#0001")
      .setDescription(`
**__Alt Name__**: ${member.user} (${member.user.username})
**__ID__**: ${member.user.id}
**__Account Created__**: ${created} days ago
**__Account Creation Date__**: ${creationDate}
**__Join Position__**: ${joinPosition}
**__Join Date__**: ${joiningDate}
`);

member.guild.channels.cache.get(LoggingChannel).send(`__Notification:__ <@&${notifyRole}>`, altEmbed);


let AutoKick = await db.fetch(`AutoKick_${member.guild.id}`);
if (!AutoKick)return console.log(`Setup Is Not Done in ${member.guild.id} aka ${member.guild.name} Guild (AutoKick Isn't Enabled)`);

let AutoKickAge = await db.get(`AutokickAge_${member.guild.id}`)
if (!AutoKickAge) return db.set(`AutokickAge_${member.guild.id}`, 8)

  if (AutoKick === true) {

 let checking = await db.get(`WhiteListed_${member.guild.id}`)

  if (checking === member.user.id) {
   let embed = new Discord.MessageEmbed()
   .setTitle(`Auto Kick System Stucked On`)
   .setDescription(`
**__NAME__** - ${member.user} (${member.user.username})
**__KICKED__** - NO
**__REASON__** - WhiteListed User`)
.setColor("RANDM");
member.guild.channels.cache.get(LoggingChannel).send(embed)

  } else {

    if (created < AutoKickAge) {
    let embed = new Discord.MessageEmbed()
    .setTitle(`Auto Kick System Kicked SomeOne`)
    .setDescription(`
**__NAME__** - ${member.user} (${member.user.username})
**__ID__** - ${member.user.id}
**__KICKED FROM GUILD NAME__** - ${member.guild.name}
**__KICKED REASON__** - ALT ( Created ${created} Days Ago)
`)
    .setColor('RANDOM')
      member.kick()
      console.log(`kicked`)
      member.guild.channels.cache.get(LoggingChannel).send(embed)

  } 
}

  } else {
    console.log(`Autokick Isnt Disabled in ${memeber.guild.name}`)

  }

   }
  }
  )





client.on("message", async message => {
if (message.channel.name == "chatbot") {
if (message.author.bot) return;
message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
if (message.content.includes(`@`)) {
return message.channel.send(`**:x: Please dont mention anyone**`);
 }
  message.channel.startTyping();
if (!message.content) return message.channel.send("Please say something.");
fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${client.user.username}&ownername=npg`)
    .then(res => res.json())
    .then(data => {
        message.channel.send(`> ${message.content} \n <@${message.author.id}> ${data.message}`);
    });
      message.channel.stopTyping();
}
});

client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})
 

const { GiveawaysManager } = require("discord-giveaways");
const manager = new GiveawaysManager(client, {
    storage: "./handlers/giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

client.giveawaysManager = manager;

client.on("message", async message => {
if(!message.guild) return;
  let prefix = db.get(`default_prefix${message.guild.id}`)
  if(prefix === null) prefix =default_prefix;
  
  if(!message.content.startsWith(default_prefix)) return;
 
})
client.on("ready", () => {
    client.user.setStatus("online");
    console.log("Bot is working!!")
});

client.on
client.on("ready", () => {
    client.user.setActivity("%help", { type: "use"})
})
const { Player } = require("discord-music-player");
const player = new Player(client, {
    leaveOnEmpty: false,
});

client.player = player;

new Player(client, {
    leaveOnEnd: true,
    leaveOnStop: true,
    leaveOnEmpty: true,
    timeout: 10,
    volume: 150,
    quality: 'high',
});
const fs = require('fs')


 client.on('guildCreate', guild =>{

    const channelId = '841994461126197248'; //put your channel ID here

    const channel = client.channels.cache.get(channelId); 
     
    if(!channel) return; //If the channel is invalid it returns
    const embed = new discord.MessageEmbed()
        .setTitle('I Joined A Guild!')
        .setDescription(`**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}`)
        .setTimestamp()
        .setColor('RANDOM')
        .setFooter(`I'm in ${client.guilds.cache.size} Guilds Now!`);
    channel.send(embed);
});


client.on('guildDelete', guild =>{
    const channelId = '841994754399928341';//add your channel ID
    const channel = client.channels.cache.get(channelId); //This Gets That Channel
    
    if(!channel) return;  //If the channel is invalid it returns
    const embed = new discord.MessageEmbed()
        .setTitle('I Left A Guild!')
        .setDescription(`**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}`)
        .setTimestamp()
        .setColor('RED')
        .setFooter(`I'm in ${client.guilds.cache.size} Guilds Now!`);
    channel.send(embed);
});

 


const smartestchatbot = require('smartestchatbot')
const scb = new smartestchatbot.Client()

client.on("message", async message => {
  if (message.channel.name == "abotchat") {
    if (message.author.bot) return;
    message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
    if (message.content.includes(`@`)) {
      return message.channel.send(`**:x: Please dont mention anyone**`);
    }
    message.channel.startTyping();
    if (!message.content) return message.channel.send("Please say something.");
    scb.chat({message: message.content, name: client.user.username, owner:"cwkhan", user: message.author.id, language:"auto"}).then(reply => {
    message.inlineReply(`${reply}`);
    })
    message.channel.stopTyping();
  }
});


require("./ExtendedMessage");


    allowedMentions: {
        // set repliedUser value to `false` to turn off the mention by default
        repliedUser: true
    }
    

    let firstbutton = new disbut.MessageButton()
  .setLabel("𝕊𝕥𝕖𝕡 𝟙")
  .setStyle("blurple")
  .setID("firstbutton")
let secondbutton = new disbut.MessageButton()
  .setLabel("𝕊𝕥𝕖𝕡 𝟚")
  .setStyle("blurple")
  .setID("secondbutton")
let thirdbutton = new disbut.MessageButton()
  .setLabel("𝕊𝕥𝕖𝕡 𝟛")
  .setStyle("blurple")
  .setID("thirdbutton")
let row1 = new disbut.MessageActionRow()
  .addComponent(firstbutton)
  .addComponent(secondbutton)
  .addComponent(thirdbutton)
const step1 = new MessageEmbed()
  .setColor("cccfff")
  .setTitle("<a:YellowArrow:870193892492980236> How to Use Uptimer!")
  .addField(
    "<:857122481088495629:873454677231034368> Get the link", "Our first step is to get the webpage link. You can find the code in the bottom or side of you repl.it(see screenshot below)! If you do not have this link, copy paste this code at the top of your `index.js` and run it again.\n ```https://pastebin.com/HJGhAUZf```"
  )
  .setImage("https://media.discordapp.net/attachments/870077234780725281/873324807444365413/Screen_Shot_2021-08-06_at_2.57.52_PM.png?width=1017&height=534")
const step3 = new MessageEmbed()
  .setColor("cccfff")
  .setTitle("<a:YellowArrow:870193892492980236> How to Use Uptimer!")
  .addField(
    "<:5286_three_emj_png:873453086981636127> Other Commands", "Now that we have added your project, you can use other command such as `projects` `remove` `stats` and `total`. Below Is an image of the remove command!  "
  )
  .setImage("https://media.discordapp.net/attachments/870077234780725281/873663248510107688/Screen_Shot_2021-08-07_at_1.25.22_PM.png")
const step2 = new MessageEmbed()
  .setColor("cccfff")
  .setTitle("<a:YellowArrow:870193892492980236> How to Use Uptimer!")
  .addField(
    "<:4751_two_emj_png:873364919259627551> Run the command", "Our next step is to runn the command. The syntax of this command is `*add <repl_url>`. If done correcty the bot should give embed saying: ```:white_check_mark: Added Succesfully!``` See Screenshot Below For More details."
  )
  .setImage("https://media.discordapp.net/attachments/870077234780725281/873366580522782820/Screen_Shot_2021-08-06_at_5.46.41_PM.png");
// Button Handler
client.on("clickButton", async (button) => {
  if (button.id === "firstbutton") {
    button.message.edit({
      embed: step1,
      component: row1,
    });
  } else if (button.id === "secondbutton") {

    button.message.edit({
      embed: step2,
      component: row1,
    });
  } else if (button.id === "thirdbutton") {
    button.message.edit({
      embed: step3,
      component: row1,
    });

  }
})
    

client.login(process.env.TOKEN);
