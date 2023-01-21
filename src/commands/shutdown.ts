import { Message } from "discord.js";
import config from "../config/config.json";
import emoji from "node-emoji";

const prefix = config.prefix;

const event = 'messageCreate';

const handler = async(message: Message) => {
  if(message.content === `${prefix}shutdown`){
    await message.channel.send("Goodbye!");
    await message.react(emoji.get('grey_exclamation'));
    await console.log("shutdown...");
    await process.exit();
  }
}

export default {event,handler};