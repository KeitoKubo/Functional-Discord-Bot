// importで揃えるとTypeScriptが使いやすくなる
import { Message } from "discord.js";
import config from "./../config/config.json";
import gametitleJson from "./../config/gametitle.json";
import Discord from "discord.js";
import emoji from "node-emoji";

const prefix = config.prefix;
// Objectのプロパティなんでも許容
const gameTitle: {[key: string] : string} = gametitleJson;
const cmdRegex = new RegExp("^" + prefix + ".*@[1-9]", 'i');

const event = 'messageCreate';

// コマンドを切り分ける
const cmdDiv = (text: string) => {
    text = text.slice(1);        //!を削除

    const [_title, _num] = text.split(/@|\s/, 2);  // title @ numで分ける \sでコメント部分を切り離す

    console.log(_title)
    console.log(_num)

    const charlen = _title.length + _num.length + 2;    // 説明の部分を取り出すときに使う   @と空白文字を消すから +2
    const comment = text.substring(charlen);

    return {
        title: _title as string,
        num: Number(_num),
        comment: comment as string
    };
}

//タイトル名を確認します
const titleCheck = (title: string) =>{
    if(title in gameTitle){
        return true;
    }else{
        return false;
    }
}

// 埋め込みテンプレ
const embedTemplate = async (message: Message) => {
    const {title, num, comment} = cmdDiv(message.content);

    // console.log(title);
    // console.log(num);
    // console.log(comment);
    console.log(`r1:${title}\nr2:${num}\nr3:${comment}`);

    // チェックする
    if(isNaN(num)) { return null; }
    if(num < 1 && 20 < num) { return null; }
    
    //画像url確認
    const titleExists = await titleCheck(title);
    if(!titleExists){ 
        message.channel.send("そのゲームは登録されていません"); 
    }

    const imageURL = titleExists ? gameTitle[title] : "";
    console.log(imageURL);

    //送信するembed
    const template = new Discord.EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(title + '@' + num)
        .setAuthor({
            name: `${message.member?.displayName}`,  //displayNameだとnicknameも考慮してくれる
            iconURL: message.author.avatarURL() ?? 'https://cdn.discordapp.com/embed/avatars/0.png',
        })
        .setDescription(comment.length > 0 ? comment : " ")    //  " "存在しない場合は空白にするように注意 nullだとInvalid Form Bodyが出る
        .setThumbnail(message.author.avatarURL() ?? 'https://cdn.discordapp.com/embed/avatars/0.png')
        .setImage(imageURL)
        .setTimestamp()

    return ({ embeds: [template] });
}

// handler
const handler = async(message: Message) => {
    if(message.author.bot) { return }
    if(!cmdRegex.test(message.content)) { return }

    // embed取得
    const embeds = await embedTemplate(message);
    
    if(embeds == null) {
        console.log('embeds else:' + message.content)
        message.channel.send(`コマンドを正しく入力してください 例:valo@4 範囲:1~20人`);
        return;
    }

    message.channel.send(embeds)
    .then(sentMessage => { 
        sentMessage.react(emoji.get('o'));      //送ったメッセージにリアクションをつける
    });
};

export default { event, handler };