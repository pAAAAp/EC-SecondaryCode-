const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "poll",
  description: "Ask a server a yes or no question.",
  aliases: ["ask", "question", "query"],
  usage: "<query>",
  category: "Moderation",
  args: true,
  guildOnly: true,
  permission: "MANAGE_MESSAGES",
  execute(message, args) {
    if (message.member.nickname) {
      var pollCreator = message.member.nickname;
    } else {
      var pollCreator = message.author.username;
    }
    const Embed = new MessageEmbed()
      .setColor(0xffc300)
      .setTitle("📋 Poll - By " + pollCreator)
      .setDescription(args.slice(0).join(" "))
      .setThumbnail(message.author.avatarURL())
      .addField("Key", "👍 = Yes!\n👎 = No!");
    message.channel.send(Embed).then((messageToReact) => {
      messageToReact.react("👍");
      messageToReact.react("👎");
      message.delete({ timeout: 500 }).catch(console.error);
    });
  },
};
