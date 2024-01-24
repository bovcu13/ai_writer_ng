import { PRIMENG_MODULES } from "../../share/primeng";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { pk } from "../../share/data/pk";
import { ConfirmationService, MessageService } from "primeng/api";
import { ArticleService } from "../../services/article.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    NgClass,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class HomeComponent implements OnInit {
  pk = pk;
  content_type = ['論壇', '新聞稿', '部落格', '社群貼文', '廣告文案'];
  forum = ['Dcard', 'Mobile01', 'PTT',];
  board: any[] = [];
  dcard_board = ['美妝', '感情', '閒聊', '健康', '美食', '旅遊'];
  mobile01_board = ['閒聊與趣味', '兩性與感情', '女人心事', '投資理財綜合', '機車消費經驗分享'];
  ptt_board = ['Gossiping', 'C_Chat', 'WomenTalk', 'HatePolitics', 'joke', 'StupidClown', 'e-shopping']
  type = ['商品體驗開箱文', '競品內容比較文', '爆紅事件議題文', '分享故事置入產品'];
  style = ['溫馨感人', 'KUSO感人', '理性嚴肅', '誇張幻想'];
  sponsorship = ['輕', '中', '高'];
  gender = ['男', '女', '無性別'];
  minAge: number = 20;
  maxAge: number = 45;

  requiredError: boolean = false;
  activeOverlay: any;
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

  comparative_dialog: boolean = false;
  demo_dialog: boolean = false;
  edit_ai_article_dialog: boolean = false;

  // 定時器
  private progressTimerId: any = null;
  ai_article_loading: boolean = false;
  ai_article_progress: number = 0;

  description_form: FormGroup;
  article_form: FormGroup;

  constructor(
    private articleServ: ArticleService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    // post欄位
    this.description_form = this.fb.group({
      content_type: ['論壇', Validators.required],
      // 選擇論壇 - 第一層描述
      forum: ['', Validators.required],
      board: ['', Validators.required],
      type: ['商品體驗開箱文'],
      style: ['溫馨感人'],
      sponsorship: ['輕'],
      // 人物設定
      gender: ['', Validators.required],
      age: [0],
      character_trait: [''],
      character_remarks: [''],
      //產品資訊
      product_name: ['', Validators.required],
      product_feature: ['', Validators.required],
      product_highlights: ['', Validators.required],
      has_comparative: [false],
      //文章資訊
      title: ['', Validators.required],
      word_limit: [100],
      key_message: [''],
      story: [''],
      created_at: [''],
      update_at: [''],
    });

    this.article_form = this.fb.group({
      //文章生成
      ai_article: ['我由Dcard上熱門文章構成，專精於製作真實且客製化的口碑文。 無論任何話題，只需提供方向，我便能為您編寫出充滿鄉民感的內容。 讓我簡要為您說明操作步驟： 1️⃣️ 在「文章版位」，決定您希望撰寫的版位、字數，以及創意值（範圍從保守到幻想）。 2️⃣ 在「產品資訊」，描述您希望推薦的商品或服務。 3️⃣ 在「人物設定」，告訴我您心中的理想作者或特定人物特質，我將根據描述進行變身。 💡小提示，詳細的描述能讓我提供更符合您期待的文章。 4️⃣ 若有特定故事走向或情境，請於「口碑切角」填寫，或是選擇留空，讓我發揮最大的創意，為您構思一段獨特的故事。 現在，開啟您的創作之旅吧！🌟'],
      modify_article: [''],
      img: [''],
      rating: [''],
    });
  }

  ngOnInit(): void {
    this.description_form.controls['age'].setValue([20, 45]);
  }

  // 口碑故事切角confirm
  confirmPostStory() {
    if (this.description_form.controls['story'].value == '') {
      this.confirmationService.confirm({
        header: '確定內容了嗎?',
        message: '確認後將產生三篇切角示範文章，請確認您的內容描述無誤。',
        accept: () => {
          if (this.isFormCompleted()) {
            this.showInfo('口碑/故事產生中，請稍候');
            // 3秒後打開口碑故事切角dialog
            setTimeout(() => {
              this.openDemoDialog();
            }, 3000);
          }
        },
        reject: () => {
        }
      });
    } else {
      this.openDemoDialog();
    }
  }

  // 產文confirm
  confirmPostArticle() {
    this.confirmationService.confirm({
      header: '確定內容了嗎?',
      message: '確認您的內容描述無誤，再繼續，或返回檢查。',
      accept: () => {
        if (this.isFormCompleted()) {
          this.showInfo('文章產生中，請稍候');
          this.ai_article_loading = true;

          // 啟動定時器，每隔一段時間隨機增加 ai_article_progress 的值
          this.progressTimerId = setInterval(() => {
            this.ai_article_progress += Math.floor(Math.random() * 10) + 1;
            if (this.ai_article_progress >= 99) {
              this.ai_article_progress = 99;
              clearInterval(this.progressTimerId);
              this.progressTimerId = null;
            }
          }, 1000);

          this.postArticleRequest();
        }
      },
      reject: () => {
      }
    });
  }

  // 生成文章
  postArticleRequest() {
    let body = this.description_form.value;
    this.articleServ.postArticleRequest(body).subscribe({
      next: data => {

        // 請求完成時清除定時器並將 ai_article_progress 設置為 100
        if (this.progressTimerId) {
          clearInterval(this.progressTimerId);
          this.progressTimerId = null;
        }
        this.ai_article_progress = 100;

        this.showSussess('產文成功！');
        this.ai_article_loading = false;
        this.article_form.controls['ai_article'].setValue(data.body.ai_article);
        console.log('data:', data);
        console.log('ai_article',this.article_form.controls['ai_article'].value);
        this.ai_article_progress = 0;
      },
      error: (err) => {
        this.showError('發生問題，產文失敗！');
        this.ai_article_loading = false;
        if (this.progressTimerId) {
          clearInterval(this.progressTimerId);
          this.progressTimerId = null;
        }
        this.ai_article_progress = 0;
        console.log(err);
      },
    });
  }

  // 確認description_form是否填寫完畢
  isFormCompleted(): boolean {
    if (this.description_form.valid) {
      const formValue = this.description_form.value;
      const jsonValue = JSON.stringify(formValue);
      console.log(jsonValue);
      return true;
    } else {
      this.requiredError = true;
      this.showError('表單未填寫完畢');
      return false;
    }
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
    navigator.clipboard.writeText(this.article_form.controls['ai_article'].value).then(() => {
      this.showSussess('已複製文章內容');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }

  ageSliderChange(event: any) {
    this.minAge = event.values[0];
    this.maxAge = event.values[1];
  }

  addOverlay(story: any) {
    this.activeOverlay = story.id;
    this.description_form.controls['story'].setValue(story.content);
  }

  countText(text: any): number {
    return text ? text.length : 0;
  }

  // dialog
  openComparativeDialog() {
    this.comparative_dialog = true;
  }

  openDemoDialog() {
    this.demo_dialog = true;
  }

  openEditAiOutputDialog() {
    this.article_form.controls['modify_article'].setValue(this.article_form.controls['ai_article'].value);
    this.edit_ai_article_dialog = true;
  }

  // msg
  showSussess(msg = '') {
    this.messageService.add({ severity: 'success', summary: '成功訊息', detail: `${msg}`, life: 3000 });
  }

  showError(msg = '') {
    this.messageService.add({ severity: 'error', summary: '錯誤訊息', detail: `${msg}`, life: 3000 });
  }

  showInfo(msg = '') {
    this.messageService.add({ severity: 'info', summary: '提示訊息', detail: `${msg}`, life: 3000 });
  }

}
