const discord = require("discord.js");
const moment = require("moment");

moment.locale("pt-BR");
module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("sugerir")
    .setNameLocalizations({
      "pt-BR": "sugerir",
      "en-US": "suggest",
    })
    .setDescription("Sugira melhorias para o nosso servidor!")
    .addStringOption((option) =>
      option
        .setName("ideia")
        .setNameLocalizations({ "pt-BR": "ideia", "en-US": "ideia" })
        .setDescription("Identifique a sua ideia")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const ideia = interaction.options.getString("ideia");
    const embed = new discord.EmbedBuilder()
      .setAuthor({
        name: `Sugestão de ${interaction.member.user.tag}`,
        iconURL: interaction.member.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor(client.cor)
      .setFooter({ text: `ID do Usuário: ${interaction.member.user.id}` })
      .setDescription(
        ideia + "\n\n:thumbsup: **Gostei**\n\n:thumbsdown: **Não Gostei**"
      );

    client.channels.cache
      .get("1085546169775697975")
      .send({ embeds: [embed] })
      .then((msg) => {
        msg.react("👍");
        msg.react("👎");
        interaction.reply({
          content: `Sua sugestão foi enviada com sucesso! [Clique aqui para ver](${msg.url})`,
          ephemeral: true,
        });
        msg.startThread({
          name: "Discuta aqui",
          autoArchiveDuration: 10080,
          reason: "Sugestão nova para discutir",
        });
      })
      .catch((err) => {
        throw err;
      });
  },
};
