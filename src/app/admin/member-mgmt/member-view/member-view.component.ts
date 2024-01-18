import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PRIMENG_MODULES } from "../../../share/primeng";
import { member } from "../../../share/data/member";
import { member_settings } from "../../../share/data/member";
import { DatePipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { output_history } from "../../../share/data/output-history";

@Component({
  selector: 'app-member-view',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    NgForOf,
    NgClass,
    NgIf,
    DatePipe
  ],
  templateUrl: './member-view.component.html',
  styleUrl: './member-view.component.scss'
})
export class MemberViewComponent implements OnInit {
  id: any;
  member: any;
  member_settings = member_settings;
  isActive: number | null = null;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.getMember();
    this.initMenuItem();
  }

  getMember() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.member = { ...member[this.id - 1], last_name: member[this.id - 1].name[0] };
    console.log('selected:', this.member)
  }

  initMenuItem() {
    const defaultIndex = this.member_settings.findIndex(item => item.name === '會員檔案');
    this.isActive = defaultIndex !== -1 ? defaultIndex : null;
  }

  toggleActive(index: number) {
    this.isActive = index;
    console.log('index:', index)
  }

  protected readonly output_history = output_history;
}
