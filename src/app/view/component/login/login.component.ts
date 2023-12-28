import { Component, OnInit } from '@angular/core';
import { PRIMENG_MODULES } from "../../../share/primeng";

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

    constructor() { }

    ngOnInit(): void {
    }

    showRegister() {
      this.register = true;
    }
}
