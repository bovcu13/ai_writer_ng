import { Component } from '@angular/core';
import { PRIMENG_MODULES } from "../../share/primeng";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    RouterOutlet,
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

}
