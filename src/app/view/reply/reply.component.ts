import { Component } from '@angular/core';
import { PRIMENG_MODULES } from "../../share/primeng";
import { comment } from "../../share/data/comment";
import { NgForOf, NgIf } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
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
  ],
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.scss',
  providers: [MessageService]
})
export class ReplyComponent {
  comment_output = comment;
  word_limit = [
    { label: '30字', value: 30 },
    { label: '50字', value: 50 },
    { label: '100字', value: 100 },
    { label: '150字', value: 150 },
  ];
  selected_word_limit: any;
  reply_count = [
    { label: '10則', value: 10 },
    { label: '30則', value: 30 },
    { label: '50則', value: 50 },
    { label: '100則', value: 100 },
  ];
  selected_reply_count: any;
  method: any;
  selectArticleDialog: boolean = false;
  colSize: string = 'col-3';

  constructor(
    private messageService: MessageService
  ) {
  }

  changeColSize() {
    this.colSize = this.colSize === 'col-3' ? 'col-5' : 'col-3';
  }

  openSelectArticleDialog() {
    this.selectArticleDialog = true;
  }

  getChipColor(style: any) {
    console.log(style);
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
