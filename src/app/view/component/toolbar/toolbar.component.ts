import { Component } from '@angular/core';
import { PRIMENG_MODULES } from "../../../share/primeng";
import { menu } from "../../../share/data/toolbar";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    PRIMENG_MODULES
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  menu = menu;
}
