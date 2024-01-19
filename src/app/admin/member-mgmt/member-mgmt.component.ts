import { Component, OnInit } from '@angular/core';
import { PRIMENG_MODULES } from "../../share/primeng";
import { member } from "../../share/data/member";
import { NgClass, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-member-mgmt',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    NgClass,
    NgIf,
    FormsModule
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
  memberPoint: any
  point: any

  active: number = 0;
  inactive: number = 0;

  pointsDialog: boolean = false;
  showActiveMembers: boolean = true;
  isActiveActive: boolean = false;
  isActiveInactive: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.countActiveMembers(this.member);
    this.showActive();
  }

  // 進入會員詳細
  goToMemberView(id: string) {
    this.router.navigate(['/admin/member-mgmt', id]);
  }

  // 會員儲值點數
  openMemberPointDialog(member: any) {
    this.memberPoint = member;
    this.point = member.points;
    console.log('memberPoint', this.memberPoint)
    console.log('point', this.point)
    this.pointsDialog = true;
  }

  // 計算啟用 or 禁用人數
  countActiveMembers(members: any[]) {
    const activeMembers = members.filter(member => member.active === true).length;
    const inactiveMembers = members.filter(member => member.active === false).length;
    this.active = activeMembers;
    this.inactive = inactiveMembers;
    console.log('active', this.active)
    console.log('inactive', this.inactive)
  };

  // 顯示啟用 or 禁用
  showActive() {
    this.showActiveMembers = true;
    this.isActiveActive = true;
    this.isActiveInactive = false;
  }

  showInactive() {
    this.showActiveMembers = false;
    this.isActiveActive = false;
    this.isActiveInactive = true;
  }

  // 禁用會員
  disableMember(member: any) {
    const index = this.member.findIndex(m => m.id === member.id);
    if (index !== -1) {
      this.member[index].active = false;
      this.countActiveMembers(this.member);
    }
  }

  // 啟用會員
  enableMember(member: any) {
    const index = this.member.findIndex(m => m.id === member.id);
    if (index !== -1) {
      this.member[index].active = true;
      this.countActiveMembers(this.member);
    }
  }

}
