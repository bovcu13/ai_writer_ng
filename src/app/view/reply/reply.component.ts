import { Component, OnInit } from '@angular/core';
import { PRIMENG_MODULES } from "../../share/primeng";
import { comment } from "../../share/data/comment";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";

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
  providers: [MessageService]
})
export class ReplyComponent implements OnInit {
  comment_output = comment;
  word_limit = [
    { label: '30字', value: 30 },
    { label: '50字', value: 50 },
    { label: '100字', value: 100 },
    { label: '150字', value: 150 },
  ];
  reply_count = [
    { label: '10則', value: 10 },
    { label: '30則', value: 30 },
    { label: '50則', value: 50 },
    { label: '100則', value: 100 },
  ];
  method: any;
  selectArticleDialog: boolean = false;
  colSize: string = 'col-3';


  description_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.description_form = this.fb.group({
      source: [''],
      article: [''],
      reply_count: [10],
      word_limit: [30],
      //回文風格
      random: [0],
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

  adjustRandomField(values: any) {
    const total = values.random + values.professional + values.humorous + values.sarcastic + values.support;
    const replyCount = this.description_form.controls['reply_count'].value;
    if (total > replyCount) {
      this.messageService.add({severity:'error', summary:'錯誤訊息', detail:'超過設定的回文數量'});
    } else if (total === 0) {
      this.description_form.controls['random'].setValue(replyCount);
    }
    // else if (total < replyCount) {
    //   this.description_form.controls['random'].setValue(replyCount - total);
    // }
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
