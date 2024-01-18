import { Component } from '@angular/core';
import { ToolbarComponent } from "../../view/component/toolbar/toolbar.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ToolbarComponent,
    RouterOutlet
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
