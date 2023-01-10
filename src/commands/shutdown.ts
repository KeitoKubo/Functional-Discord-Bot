import { Message } from "discord.js";
const prefix = require('../config/config.json').prefix;

const aaa = 'messageCreate';

const handler = async(message: Message) => {
  if(message.content === `${prefix}shutdown`){
    await message.channel.send("Goodbye!");
    await console.log("shutdown...");
    await process.exit();
  }
}

export default {aaa,handler};