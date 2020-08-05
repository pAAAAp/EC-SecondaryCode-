const { prefix } = require("../config.json");
const { MessageEmbed, Message } = require("discord.js");
module.exports = {
  name: "help",
  description: "List all of my commands or info about a specific command.",
  aliases: ["commands", "cmds"],
  usage: "[cmd]",
  execute(message, args) {
    const { commands } = message.client;

    if (!args.length) {
      const Embed = new MessageEmbed()
        .setTitle("Help")
        .setDescription(
          `Here's a list of all my commands:\n\n${commands
            .map((command) => command.name)
            .join(
              "\n"
            )}\n\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
        );

      return message.author
        .send(Embed)
        .then(() => {
          if (message.channel.type === "dm") return;
          message.reply("I've sent you a DM with all my commands!");
        })
        .catch((error) => {
          console.error(
            `Could not send help DM to ${message.author.tag}.\n`,
            error
          );
          message.reply(
            "it seems like I can't DM you! Do you have DMs disabled?"
          );
        });
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("that's not a valid command!");
    }

    let aliases;
    if (command.aliases) {
      aliases = `\'${command.aliases.join("', '")}\'`;
    } else {
      aliases = "None";
    }
    if (command.usage) {
      data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
    }

    const Embed = new MessageEmbed()
      .setTitle(args[0].toLowerCase())
      .addField("Description", command.description)
      .addField("Aliases", aliases);

    message.channel.send(data, { split: true });
  },
};
