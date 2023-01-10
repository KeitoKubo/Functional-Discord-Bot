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
    const hour1 = date1.getHours().toString();
    if(hour1>'7' && hour1<'12'){
      message.channel.send("午前中もがんばろう！")
    }
    else if(hour1<'17'){
      message.channel.send('午後も乗り切ろう！応援してるよ！');
    }
    else{
      message.channel.send('お仕事お疲れ様です');
    }
  }
};

export default { event, handler };