// importで揃えるとTypeScriptが使いやすくなる
import { Message } from "discord.js";
import config from "./../config/config.json";
import gametitleJson from "./../config/gametitle.json";
import Discord from "discord.js";
import emoji from "node-emoji";

// gametitleの型 プロパティの値なんでも許容
interface GameTitle {
    [key: string] : string
}

const prefix = config.prefix;
const gametitle: GameTitle = gametitleJson;

const event = 'messageCreate';
const cmdRegex = new RegExp("^" + prefix + ".*@[1-9]", 'i');

const handler = async(message: Message) => {
    if(message.author.bot) { return }
    if(!cmdRegex.test(message.content)) { return }

    const embeds = await embedTemplate(message.content);
    if(embeds != null){
            message.channel.send(embeds)
            .then(sentMessage => { 
                sentMessage.react(emoji.get('o'));      //送ったメッセージにリアクションをつける
            });
        
    }else{
        console.log('embeds else:' + message.content)
        message.channel.send(`コマンドを正しく入力してください 例:valo@4 範囲:1~20人`);
    }
    

    //タイトル名を確認します
    function titleCheck(title: string){
        if(title in gametitle){
            return gametitle[title];
        }else{
            message.channel.send("そのゲームは登録されていません");
            return null;
        }
    }

    async function embedTemplate(messageContent: string){
        const arrayString = messageContent.split('@');       //空白文字のゲームが判断できない     !league of legends@4 hogehoge
        const gameTitle = arrayString[0].slice(1);        //!を削除

        const numText = arrayString[1].split(/ | /);     //数字 と 説明取り出し
        let num = Number(numText[0]);
        const commentString = numText.slice(1).join(" ");     //ここは強制的に全角スペースとかを半角スペースに変える
        
        console.log(gameTitle);
        console.log(num);
        console.log(commentString);
        
        //画像urlの貼り付け
        const imageURL = await titleCheck(gameTitle);
        console.log(imageURL);

        //numの確認 人数オーバーはエラー出す
        if(!isNaN(num) && 1 <= num && num <= 20){
            num = Number(num);
        }else{
            num = 0;
            console.log(`r1:${gameTitle}\nr2:${num}\nr3:${commentString}`);
            return null;
        }

        //check test
        console.log(`r1:${arrayString[0]}\nr2:${arrayString[1]}\nr3:${commentString}`);

        //送信するembed
        const template = new Discord.EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(gameTitle + '@' + num)
            .setAuthor({
                name: `${message.member?.displayName}`,  //displayNameだとnicknameも考慮してくれる
                iconURL: message.author.avatarURL() ?? 'https://cdn.discordapp.com/embed/avatars/0.png',
            })
            .setDescription(commentString)
            .setThumbnail(message.author.avatarURL() ?? 'https://cdn.discordapp.com/embed/avatars/0.png')
            .setImage(imageURL)
            .setTimestamp()

        return ({ embeds: [template] });

    }

};

export default{event, handler};