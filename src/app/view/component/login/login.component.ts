import { Component, OnInit } from '@angular/core';
import { PRIMENG_MODULES } from "../../../share/primeng";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  register: boolean = false;

  constructor(private router: Router) {
  }


  ngOnInit(): void {

  }

  login() {
    window.sessionStorage.setItem('auth-user', 'user');
    this.router.navigate(['/home']);
  }

  adminLogin() {
    window.sessionStorage.setItem('auth-user', 'admin');
    this.router.navigate(['/admin']);
  }

  showRegister() {
    this.register = true;
  }
}
