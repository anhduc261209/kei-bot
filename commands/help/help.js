const ButtonPages = require('discord-button-pages');
const { MessageEmbed } = require('discord.js')
const disbutpages = require("discord-embeds-pages-buttons")
const Discord = require("discord.js");
const disbut = require("discord-buttons");
const MessageButton = require("discord-buttons");

module.exports = {
  name: "help",
  description:
    "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "info",
  run: async (client, message, args) => {
    
   let helpEmbed = new MessageEmbed()
      .setTitle("**__Kei bot__ commands:**")
      .setDescription("")
      .addField(
        "• **ADMIN**",
        "```emojiadd, add-these, announce, bug, addrole, ban, purge, hackban, kick, lock, mute, removerole, resetwarns, setnick, setmodlog, slowmode, unlock, unmute, voicekick, warn, warnings, setwelcome , nuke```"
      )
      .addField(
        "• **GENERAL**",
        "```servericon , calculator , invite , membercount ,  help , serverinfo , leaderboard``` "
      )
      .addField(
        "• **GIVEAWAY**",
        "```gstart , gend , greroll```"
      )
      .addField(
        "• **SUGGESTION**",
        "```sreply, setsuggest, suggest```"
      )
      .addField(
        "• **UTILITY**",
        "```discriminator, findemoji, haste, sudo , timedifference```"
      )
    
      .addField(
        "• **LEVEL**",
        "```lb, rank```"
      )
      .addField(
        "• **SEARCH**",
        "```anime, discord, github, ig, npm, twitter```"
      )
      .addField(
        "• **ECONOMY**",
        "```balance, daily, fish, addmoney, beg, buy, deposit, leaderboard, pay, removemoney, roulette, sell, slots, shop, coins-system, withdraw, work```"
      )
      .addField(
        "• **Backup**",
        "```backup-load, info-backup, backup-create```"
      )
      .addField(
        "• **INFO**",
        "```inv, help, invite, invites, badges, botinfo, embedgen, imdb, ping, pokemon, serverinfo, servericon, snipe, uptime, userinfo``` "
      )
      .addField(
        "• **MUSIC**",
        "```loop, clear, disable-loop, join, leave, nowplaying, play, playlist, pause, queue, resume, shuffle, skip, stop, volume```"
      )
      .addField(
        "• **IMAGE**",
        "```neko, slap, jail, love, triggered, achievement, avatarfusion, panda, rip, affect``` "
      )
      .addField(
        "• **MODERATION**",
        "```lockchannel , purge , slowmode , mute , unmute ,   nuke```"
      )
      .addField(
        "• **OWNER**",
        "```eval , reload , serverlist , test1```"
      )
      .addField(
        "• **FUN**",
        "```advice, ascii, cat, cry, dog, fact, hug, joke, kiss, kpop, math, meme, pat, punch, avatar``` "
      )
      
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter(
      `Kei`,
      client.user.displayAvatarURL(),
      message.delete()
    );

      message.channel.send(helpEmbed)

  },
};