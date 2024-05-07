import { Component, OnInit } from '@angular/core';
import { PRIMENG_MODULES } from "../../share/primeng";
import { member } from "../../share/data/member";
import { DatePipe, NgClass, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: 'app-member-mgmt',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    NgClass,
    NgIf,
    FormsModule,
    DatePipe
  ],
  templateUrl: './member-mgmt.component.html',
  styleUrl: './member-mgmt.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class MemberMgmtComponent implements OnInit {
  // member = member.map(m =>
  //   (
  //     { ...m, last_name: m.name[0] }
  //   ));
  memberData: any[] = []
  selectedMembers: any[] = []
  memberPoint: any
  point: any

  active: number = 0;
  inactive: number = 0;

  pointsDialog: boolean = false;
  showActiveMembers: boolean = true;
  isActiveActive: boolean = false;
  isActiveInactive: boolean = false;

  constructor(
    private userServ: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getMembers();
  }

  getMembers() {
    this.userServ.getAllUserRequest().subscribe({
      next: (res) => {
        this.memberData  = res.body.users.map((m: any) => {
          return (
            { ...m, last_name: m.name[0] }
          );
        });
        console.log('this.memberData', this.memberData)

        this.countActiveMembers(this.memberData);
        this.showActive();
      },
      error: (error) => {
        console.log(error);
      }
    });
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
    const inactiveMembers = members.length - activeMembers;
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
    console.log('member', member)
    this.confirmationService.confirm({
      header: '禁用此會員',
      message: `確定要禁用 ${member.name} 嗎？`,
      accept: () => {
        this.userServ.patchUserRequest(member.id, { "active": false }).subscribe({
          next: (res) => {
            console.log('res', res)
            this.showSussess('已禁用此會員');
            this.countActiveMembers(this.memberData);
          },
          error: (error) => {
            console.log(error);
          }
        });
      },
      reject: () => {
      }
    });
  }

  // 啟用會員
  enableMember(member: any) {
    const index = this.memberData.findIndex(m => m.id === member.id);
    if (index !== -1) {
      this.memberData[index].active = true;
      this.countActiveMembers(this.memberData);
    }
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
