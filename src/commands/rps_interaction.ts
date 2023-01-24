// typescriptはrequire使ったほうが良い vscodeが型情報をうまく読み取ってくれる
import { Events, Interaction } from "discord.js";
import emoji from 'node-emoji';

const rps = ["rock", "paper", "scissors"];  // indexでジャンケンの勝敗つける
const rps_emoji = [":fist:", ":raised_hand_with_fingers_splayed:", ":v:"];  // 使う絵文字 チョキだけ vにした
const fixedPhrase = ["One More Time!", "You Win!", "You Lose..."];  // 表示するテンプレ

const event: string = Events.InteractionCreate;

// 0: One More, 1: UserWin, 2: BotWin
const getResult = (userHand: number, botHand: number) => {
  // あいこ
  if(userHand === botHand) { return 0; }

  // rock vs scissors
  if(userHand === 0 && botHand === 1){ 
    return 1; 
  }
  else if(userHand === 2 && botHand === 0){ 
    return 2; 
  }

  // 勝敗
  if(userHand > botHand) {
    return 1;
  }else{
    return 2;
  }
}

const handler = async (interaction: Interaction) => {
  if(!interaction.isButton()) { return }
  if(!/^(rock|paper|scissors)$/.test(interaction.customId)) { return }

  // rpsの配列から勝敗を考える
  const userHand = rps.indexOf(interaction.customId);
  const botHand = Math.floor(Math.random() * 3);
  
  // 結果
  const result = getResult(userHand, botHand);

  // ボタンを押したユーザーに対して返信する
  await interaction.reply(
    `<@${interaction.user.id}>\n` +
    `You: ${emoji.get(rps_emoji[userHand])} vs Bot: ${emoji.get(rps_emoji[botHand])}\n` +
    fixedPhrase[result]
  );

  // console.log(interaction.customId);
}

export default { event, handler }
