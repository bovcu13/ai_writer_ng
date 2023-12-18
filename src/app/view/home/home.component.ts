import { PRIMENG_MODULES } from "../../share/primeng";
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  forum = ['Dcard', 'Mobile01', 'PTT',];
  selected_forum: any;

  dcard_type = ['美妝', '感情', '閒聊', '健康', '美食', '旅遊']
  mobile01_type = ['閒聊與趣味', '兩性與感情', '女人心事', '投資理財綜合', '機車消費經驗分享']
  ptt_type = ['Gossiping', 'C_Chat', 'WomenTalk', 'HatePolitics', 'joke', 'StupidClown', 'e-shopping']
  selected_type: any;

  getTypes() {
    switch (this.selected_forum) {
      case 'Dcard':
        return this.dcard_type;
      case 'Mobile01':
        return this.mobile01_type;
      case 'PTT':
        return this.ptt_type;
      default:
        return ['尚未選擇論壇'];
    }
  }

}
