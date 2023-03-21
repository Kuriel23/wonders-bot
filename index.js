const discord = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways");
require("dotenv").config();

const client = new discord.Client({
  intents: 3276799,
  cacheWithLimits: {
    MessageManager: {
      sweepInterval: 300,
      sweepFilter: discord.Sweepers.filterByLifetime({
        lifetime: 60,
        getComparisonTimestamp: (m) => m.editedTimestamp ?? m.createdTimestamp,
      }),
    },
  },
});

client.cor = "#000000";
client.canais = {
  errors: "1047219857567010837",
};

const manager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: client.cor,
    embedColorEnd: client.cor,
    reaction: "🎉",
  },
});
client.giveawaysManager = manager;

process.on("unhandledRejection", (error) => {
  console.log(error);
  client.channels.cache
    .get(client.canais.errors)
    .send("Erro detectado: \n" + error);
});
process.on("uncaughtException", (error) => {
  console.log(error);
  client.channels.cache
    .get(client.canais.errors)
    .send("Erro detectado: \n" + error);
});

const boilerplateComponents = async () => {
  await require("./src/util/boilerplateClient")(client);
};

boilerplateComponents();
