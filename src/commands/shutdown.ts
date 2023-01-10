import { Message } from "discord.js";
const prefix = require('../config/config.json').prefix;

const event = 'messageCreate';

const handler = async(message: Message) => {
  if(message.content === `${prefix}shutdown`){
    await message.channel.send("Goodbye!");
    await console.log("shutdown...");
    await process.exit();
  }
}

export default {event,handler};