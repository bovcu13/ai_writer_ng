import { PRIMENG_MODULES } from "../../share/primeng";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { pk } from "../../share/data/pk";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  pk = pk;
  content = ['論壇', '新聞稿', '部落格', '社群貼文', '廣告文案'];
  forum = ['Dcard', 'Mobile01', 'PTT',];
  word_limit = [100, 300, 600, 1000];
  board: any[] = [];
  dcard_board = ['美妝', '感情', '閒聊', '健康', '美食', '旅遊'];
  mobile01_board = ['閒聊與趣味', '兩性與感情', '女人心事', '投資理財綜合', '機車消費經驗分享'];
  ptt_board = ['Gossiping', 'C_Chat', 'WomenTalk', 'HatePolitics', 'joke', 'StupidClown', 'e-shopping']
  type = ['商品體驗開箱文', '競品內容比較文', '爆紅事件議題文', '分享故事置入產品'];
  style = ['溫馨感人', 'KUSO感人', '理性嚴肅', '誇張幻想'];
  sponsorship = ['輕', '中', '高'];
  gender = ['男', '女', '無性別'];
  comparative_dialog: boolean = false;
  demo_dialog: boolean = false;
  colSize: string = 'col-3';
  story_output = [
    {
      id: 1,
      content: '口碑故事1'
    },
    {
      id: 2,
      content: '口碑故事2'
    },
    {
      id: 3,
      content: '口碑故事3'
    }
  ]
  selected_story: any;
  activeOverlay: any;
  minAge: number = 20;
  maxAge: number = 45;

  description_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.description_form = this.fb.group({
      content: ['論壇'],
      // 選擇論壇 - 第一層描述
      forum: [''],
      word_limit: [100],
      board: [''],
      type: [''],
      style: [''],
      sponsorship: [''],
      // 人物設定
      gender: [''],
      age: [0],
      from_age: [''],
      to_age: [''],
      character_trait: [''],
      character_remarks: [''],
      //產品資訊
      product_name: [''],
      product_feature: [''],
      product_highlights: [''],
      comparative: [''],
      //文章資訊
      title: [''],
      key_message: [''],
      story: [''],
      //文章生成
      article_output: ['我由Dcard上熱門文章構成，專精於製作真實且客製化的口碑文。\n' +
      '無論任何話題，只需提供方向，我便能為您編寫出充滿鄉民感的內容。\n' +
      '讓我簡要為您說明操作步驟：\n' +
      '  1️⃣️ 在「文章版位」，決定您希望撰寫的版位、字數，以及創意值（範圍從保守到幻想）。\n' +
      '  2️⃣ 在「產品資訊」，描述您希望推薦的商品或服務。\n' +
      '  3️⃣ 在「人物設定」，告訴我您心中的理想作者或特定人物特質，我將根據描述進行變身。\n' +
      '     💡小提示，詳細的描述能讓我提供更符合您期待的文章。\n' +
      '  4️⃣ 若有特定故事走向或情境，請於「口碑切角」填寫，或是選擇留空，讓我發揮最大的創意，為您構思一段獨特的故事。\n' +
      '  現在，開啟您的創作之旅吧！🌟'],
      img: [''],
      rating: [''],
      created_at: [''],
      update_at: [''],
    });
  }

  ngOnInit(): void {
    this.description_form.controls['age'].setValue([20, 45]);
  }

  wordSliderStep(word_limit: any) {
    switch (word_limit) {
      case 100:
        return 200;
      case 300:
        return 300;
      case 600:
        return 400;
      case 1000:
        return 400;
      default:
        return 100;
    }
  }

  wordSliderChange(event: any) {
    console.log(event);
  }

  ageSliderChange(event: any) {
    this.minAge = event.values[0];
    this.maxAge = event.values[1];
  }

  addOverlay(story: any) {
    this.activeOverlay = story.id;
    this.selected_story = story.content;
  }

  countText(text: any): number {
    return text.length;
  }

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
    switch (this.description_form.controls['forum'].value) {
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

  copyArticleOutput() {
    navigator.clipboard.writeText(this.description_form.controls['article_output'].value).then(() => {
      this.messageService.add({ severity: 'success', summary: '複製成功', detail: '已複製文章內容' });
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }

}
