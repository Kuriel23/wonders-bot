const discord = require("discord.js");
const moment = require("moment");

moment.locale("pt-BR");
module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("denunciar")
    .setNameLocalizations({
      "pt-BR": "denunciar",
      "en-US": "report",
    })
    .setDescription("Reporte alguém para nós!")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o usuário")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("motivo")
        .setNameLocalizations({ "pt-BR": "motivo", "en-US": "reason" })
        .setDescription("Identifique o motivo")
        .setRequired(true)
    )
    .addAttachmentOption((option) =>
      option
        .setName("prova")
        .setNameLocalizations({ "pt-BR": "prova", "en-US": "clue" })
        .setDescription("Anexe uma prova")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("usuário");
    const motivo = interaction.options.getString("motivo");
    const clue = interaction.options.getString("prova").proxyURL;
    const embed = new discord.EmbedBuilder()
      .setTitle("Nova denúncia!")
      .setColor(client.cor)
      .addFields(
        {
          name: "Reportado:",
          value: `Tag: ${user.tag}\n\nID: ${user.id}`,
        },
        {
          name: "Vítima:",
          value: `Tag: ${interaction.user.tag}\n\nID: ${interaction.user.id}`,
        },
        {
          name: "Motivo:",
          value: motivo,
        }
      )
      .setImage(clue);

    client.channels.cache
      .get("1085544618831130645")
      .send({ embeds: [embed] })
      .then((msg) => {
        interaction.reply({
          content: `Sua denúncia foi enviada com sucesso!`,
          ephemeral: true,
        });
      })
      .catch((err) => {
        throw err;
      });
  },
};
