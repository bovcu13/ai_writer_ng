import { Component, OnInit } from '@angular/core';
import { PRIMENG_MODULES } from "../../../share/primeng";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { AuthService } from "../../../services/auth.service";
import { NgIf } from "@angular/common";
import { TokenStorageService } from "../../../services/token-storage.service";
import { errorMessage } from "../../../interceptor/error.interceptor";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class LoginComponent implements OnInit {

  roles!: string;
  register: boolean = false;
  requiredError: boolean = false;

  login_form: FormGroup;
  register_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authServ: AuthService,
    private tokenStorage: TokenStorageService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.login_form = this.fb.group({
      user_name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.register_form = this.fb.group({
      user_name: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: [''],
      phone_number: [''],
      role_id: ['',],
      created_by: ['',],
    });
  }


  ngOnInit(): void {

  }

  login() {
    let body = this.login_form.value;
    this.authServ.login(body).subscribe({
      next: data => {
        console.log(data)
        this.tokenStorage.saveToken(data.body.access_token);
        this.tokenStorage.saveRefreshToken(data.body.refresh_token);
        this.tokenStorage.saveUser(data.body.name);
        this.roles = this.tokenStorage.getUser();
        if (this.roles === "admin") {
          this.router.navigate(['/admin']);
          this.showSuccess('登入成功！');
        } else {
          this.router.navigate(['/home']);
          this.showSuccess('登入成功！');
        }
      },
      error: err => {
        this.showError(errorMessage)
      }
    });
  }

  adminLogin() {
    window.sessionStorage.setItem('auth-user', 'admin');
    this.router.navigate(['/admin']);
  }

  showRegister() {
    this.register = true;
  }

  // 註冊
  registerSubmit() {
    if (this.isFormCompleted(this.register_form)) {
      let body = this.register_form.value;
      this.authServ.register(body).subscribe({
        next: data => {
          // 關閉註冊dialog
          this.register = false;
          this.register_form.reset();
          this.showSuccess('註冊成功');
        },
        error: err => {
          console.log(err)
        }
      });
    }
  }

  // 確認表單是否填寫完畢
  isFormCompleted(form: any): boolean {
    if (form.valid) {
      const formValue = form.value;
      const jsonValue = JSON.stringify(formValue);
      console.log(jsonValue);
      return true;
    } else {
      this.requiredError = true;
      this.showError('表單未填寫完畢');
      return false;
    }
  }

  // msg
  showSuccess(msg = '') {
    this.messageService.add({ severity: 'success', summary: '成功訊息', detail: `${msg}`, life: 3000 });
  }

  showError(msg = '') {
    this.messageService.add({ severity: 'error', summary: '錯誤訊息', detail: `${msg}`, life: 3000 });
  }

  showInfo(msg = '') {
    this.messageService.add({ severity: 'info', summary: '提示訊息', detail: `${msg}`, life: 3000 });
  }
}
