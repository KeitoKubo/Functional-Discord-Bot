// typescriptはrequire使ったほうが良い vscodeが型情報をうまく読み取ってくれる
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events, Message } from "discord.js";
import emoji from 'node-emoji';
import config from "../config/config.json";

const prefix = config.prefix;

const event: string = Events.MessageCreate;

// embed例
const embed = new EmbedBuilder()
  .setTitle("Let's Play Rock-Paper-Scissors")
  .setColor("Blue")
  .setTimestamp();

// button https://discordjs.guide/interactions/buttons.html#building-and-sending-buttons
const row = new ActionRowBuilder<ButtonBuilder>()
  .addComponents(
    new ButtonBuilder()
      .setCustomId("rock")
      .setLabel(`${emoji.get(":fist:")}グー`)
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("scissors")
      .setLabel(`${emoji.get(":crossed_fingers:")}チョキ`)
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("paper")
      .setLabel(`${emoji.get(":raised_hand_with_fingers_splayed:")}パー`)
      .setStyle(ButtonStyle.Primary),
  );

const handler = async (message: Message) => {
  if(message.author.bot === true) { return }
  if(message.content !== `${prefix}rps`) { return }

  message.channel.send({
    embeds: [embed],
    components: [row]
  })
}

export default { event, handler };
