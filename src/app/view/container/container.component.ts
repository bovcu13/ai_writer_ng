import { Component } from '@angular/core';
import { PRIMENG_MODULES } from "../../share/primeng";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    PRIMENG_MODULES
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

}
