import { Message } from "discord.js";
const prefix = require('../config/config.json').prefix;
const emoji = require('node-emoji');

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