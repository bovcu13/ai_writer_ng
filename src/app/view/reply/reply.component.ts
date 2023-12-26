import { Component, OnInit } from '@angular/core';
import { PRIMENG_MODULES } from "../../share/primeng";
import { comment } from "../../share/data/comment";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: 'app-reply',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
  ],
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ReplyComponent implements OnInit {
  comment_output = comment;
  selectArticleDialog: boolean = false;
  colSize: string = 'col-3';
  errorShown: boolean = false;
  requiredError: boolean = false;

  description_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.description_form = this.fb.group({
      source: ['', Validators.required],
      article: ['', Validators.required],
      reply_count: [10, Validators.required],
      word_limit: [30, Validators.required],
      //回文風格
      random: [0, Validators.required],
      professional: [0],
      humorous: [0],
      sarcastic: [0],
      support: [0],
      //回文內容切角
      professional_keyword: [''],
      humorous_keyword: [''],
      sarcastic_keyword: [''],
      support_keyword: [''],
    });
  }

  ngOnInit(): void {
    this.description_form.valueChanges.subscribe(values => {
      this.adjustRandomField(values);
    });
  }

  confirm() {
    this.confirmationService.confirm({
      header: '確定內容了嗎?',
      message: '確認您的內容描述無誤，再繼續，或返回檢查。',
      accept: () => {
        this.replyOutput();
      },
      reject: () => {

      }
    });
  }

  replyOutput() {
    if (this.description_form.valid) {
      const formValue = this.description_form.value;
      const total = formValue.random + formValue.professional + formValue.humorous + formValue.sarcastic + formValue.support;
      const replyCount = formValue.reply_count;
      if (total < replyCount) {
        formValue.random = replyCount - total;
      }
      const jsonValue = JSON.stringify(formValue);
      console.log(jsonValue);
      this.messageService.add({ severity: 'info', summary: '確認', detail: '回文產生中，請稍候', life: 3000 });
    } else {
      this.requiredError = true;
      this.messageService.add({ severity: 'error', summary: '錯誤訊息', detail: '表單未填寫完畢', life: 3000 });
    }
  }

  adjustRandomField(values: any) {
    const total = values.random + values.professional + values.humorous + values.sarcastic + values.support;
    const replyCount = this.description_form.controls['reply_count'].value;
    if (total > replyCount) {
      if (!this.errorShown) {
        this.messageService.add({ severity: 'error', summary: '錯誤訊息', detail: '超過設定的回文數量', sticky: true });
        this.errorShown = true;
      }
    } else if (total < replyCount) {
      this.errorShown = false;
      this.messageService.clear();
    }
  }

  changeColSize() {
    this.colSize = this.colSize === 'col-3' ? 'col-5' : 'col-3';
  }

  openSelectArticleDialog() {
    this.selectArticleDialog = true;
  }

  getChipColor(style: any) {
    switch (style) {
      case "專業評論":
        return 'text-xs bg-blue-100';
      case "幽默有趣":
        return 'text-xs bg-green-100';
      case "嘲諷酸":
        return 'text-xs bg-yellow-100';
      case "跟風支持":
        return 'text-xs bg-indigo-100';
      default:
        return 'text-xs';
    }
  }

  copy(content: any) {
    navigator.clipboard.writeText(content).then(() => {
      this.messageService.add({ severity: 'success', summary: '複製成功', detail: '已複製此則內容' });
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }
}
