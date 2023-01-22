// typescriptはrequire使ったほうが良い vscodeが型情報をうまく読み取ってくれる
import { Events, Interaction } from "discord.js";
import emoji from 'node-emoji';
import config from "../config/config.json";

const prefix = config.prefix;

const event: string = Events.InteractionCreate;

const handler = (interaction: Interaction) => {
  if(!interaction.isButton()) { return }

	console.log(interaction);
}

export default { event, handler }