import { Component } from '@angular/core';
import { PRIMENG_MODULES } from "../../../share/primeng";
import { PaginatorModule } from "primeng/paginator";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
