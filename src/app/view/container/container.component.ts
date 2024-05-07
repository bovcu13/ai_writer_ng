import { Component } from '@angular/core';
import { PRIMENG_MODULES } from "../../share/primeng";
import { RouterOutlet } from "@angular/router";
import { ToolbarComponent } from "../component/toolbar/toolbar.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    RouterOutlet,
    ToolbarComponent,
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

}
