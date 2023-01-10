import { Message } from "discord.js";

// 先頭文字は別ファイル
const prefix = "!";

// 使用するイベント名
const event = 'messageCreate';

// 処理の内容
const handler = async (message: Message) => {
  if(message.content ===`${prefix}time`){
    const date1 = new Date();
    message.channel.send(date1.toLocaleString());
  }
};

export default { event, handler };