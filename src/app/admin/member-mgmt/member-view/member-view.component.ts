import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PRIMENG_MODULES } from "../../../share/primeng";
import { member } from "../../../share/data/member";
import { member_settings } from "../../../share/data/member";
import { trade_record } from "../../../share/data/member";
import { output_history } from "../../../share/data/output-history";
import { DatePipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { UserService } from "../../../services/user.service";

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
  trade_record = trade_record;
  output_history = output_history;
  page_loading: boolean = true;

  constructor(
    private userServ: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getMember();
  }

  getMember() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userServ.getOneUserRequest(this.id).subscribe({
      next: (res) => {
        this.member = {
          ...res.body,
          last_name: res.body.name[0]
        }
        this.page_loading = false;
        console.log('this.member', this.member)
      },
      error: (err) => {
        console.log('err', err)
      }
    });
  }

  getPaymentIcon(method: string): string {
    switch (method) {
      case 'Credit Card':
        return 'fa-regular fa-credit-card';
      case 'PayPal':
        return 'fa-brands fa-cc-paypal';
      case 'Bank Transfer':
        return 'fa-solid fa-piggy-bank';
      case 'Google Pay':
        return 'fa-brands fa-google-pay';
      case 'Apple Pay':
        return 'fa-brands fa-apple-pay';
      default:
        return 'fa-solid fa-piggy-bank';
    }
  }

  getTradeStatusClass(status: string): string {
    switch (status) {
      case 'Success':
        return 'text-xs font-bold text-green-900 success-bg';
      case 'Pending':
        return 'text-xs font-bold text-orange-900 warning-bg';
      case 'Failed':
        return 'text-xs font-bold text-red-900 danger-bg';
      default:
        return 'text-xs font-bold text-blue-50 full-gradient-bg';
    }
  }
}
