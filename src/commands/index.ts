// コマンドのファイルをインポート
import timeNotificaiton from "./time";
import shutDown from "./shutdown";
import gameInviteEmbed from "./gameInviteEmbed";
import rps_embed from "./rps_embed";
import rps_interaction from "./rps_interaction";

// まとめてエクスポート 改行した方が後で管理しやすい
export default [
  timeNotificaiton,
  shutDown,
  gameInviteEmbed,
  rps_embed,
  rps_interaction,
]
