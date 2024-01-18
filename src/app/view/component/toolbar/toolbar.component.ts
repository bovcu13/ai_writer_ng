import { Component, OnInit } from '@angular/core';
import { PRIMENG_MODULES } from "../../../share/primeng";
import { admin_menu, menu } from "../../../share/data/toolbar";
import { AuthService } from "../../../services/auth.service";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    NgIf
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  admin_menu = admin_menu;
  menu = menu;
  userType: any;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.userType = this.authService.getUserName();
  }

  getMenuItem() {
    if (this.userType === 'admin') {
      return this.admin_menu;
    } else {
      return this.menu;
    }
  }

  logout() {
    this.authService.logout();
  }

}
