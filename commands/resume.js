const db = require("../mongoDB");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "resume",
  description: "Start paused music.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guild.id);

    try {
      if (!queue) {
        return interaction.reply({ content: '⚠️ Queue is empty!!', ephemeral: true });
      }

      if (!queue.paused) {
        return interaction.reply({ content: '⚠️ No paused music!!', ephemeral: true });
      }

      const success = queue.resume();

      const embed = new EmbedBuilder()
        .setColor('#7645fe')
        .setAuthor({
          name: 'Song Resumed',
          iconURL: 'https://cdn.discordapp.com/attachments/1236646673912959076/1239594810504122428/Thiet_ke_chua_co_ten.png?ex=66437e21&is=66422ca1&hm=ac6322616ad908bfaa023390b1921b8cf69147a983bc4284b13109f53cbaff21&',
          url: 'https://discord.gg/loading99'
        })
        .setDescription(success ? '**The music springs back to life!!**' : '❌ Error: Unable to resume song')
        

      return interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
    }
  },
};
