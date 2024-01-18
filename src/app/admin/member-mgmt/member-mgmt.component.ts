import { Component, OnInit } from '@angular/core';
import { PRIMENG_MODULES } from "../../share/primeng";
import { member } from "../../share/data/member";
import { ContainerComponent } from "../../view/container/container.component";
import { NgClass } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-member-mgmt',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    NgClass
  ],
  templateUrl: './member-mgmt.component.html',
  styleUrl: './member-mgmt.component.scss'
})
export class MemberMgmtComponent implements OnInit {
  member = member.map(m =>
    (
      { ...m, last_name: m.name[0] }
    ));
  selectedMembers: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('member', this.member)
  }

  goToMemberView(id: string) {
    this.router.navigate(['/admin/member-mgmt', id]);
  }
}
