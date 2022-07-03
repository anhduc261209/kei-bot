const discord = require("discord.js");

module.exports = {
  name: "",
  category: "",
  description: "",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setTitle()
    .setDescription()
    .setColor()
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter(
      ``,
      client.user.displayAvatarURL(),
      message.delete()
    );
    
    message.channel .send(embed)
    
  
  }
}