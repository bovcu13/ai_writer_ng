import { PRIMENG_MODULES } from "../../share/primeng";
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { pk } from "../../share/data/pk";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    FormsModule,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  pk = pk;
  forum = ['Dcard', 'Mobile01', 'PTT',];
  selected_forum: any;
  word_limit = ['100', '300', '600', '1000']
  selected_word_limit: any;
  board: any[] = [];
  selected_board: any;
  dcard_board = ['美妝', '感情', '閒聊', '健康', '美食', '旅遊']
  mobile01_board = ['閒聊與趣味', '兩性與感情', '女人心事', '投資理財綜合', '機車消費經驗分享']
  ptt_board = ['Gossiping', 'C_Chat', 'WomenTalk', 'HatePolitics', 'joke', 'StupidClown', 'e-shopping']
  type = ['商品體驗開箱文', '競品內容比較文', '爆紅事件議題文', '分享故事置入產品']
  selected_type: any;
  style = ['溫馨感人', 'KUSO感人', '理性嚴肅', '誇張幻想']
  selected_style: any;
  sponsorship = ['輕', '中', '高']
  selected_sponsorship: any;
  comparative: any;
  comparative_dialog: boolean = false;
  demo_dialog: boolean = false;
  colSize: string = 'col-3';

  openComparativeDialog() {
    this.comparative_dialog = true;
  }

  openDemoDialog() {
    this.demo_dialog = true;
  }

  changeColSize() {
    this.colSize = this.colSize === 'col-3' ? 'col-5' : 'col-3';
  }

  getTypes() {
    switch (this.selected_forum) {
      case 'Dcard':
        return this.board = this.dcard_board;
      case 'Mobile01':
        return this.board = this.mobile01_board;
      case 'PTT':
        return this.board = this.ptt_board;
      default:
        return this.board = ['尚未選擇論壇'];
    }
  }

}
