import { Component } from '@angular/core';
import { PRIMENG_MODULES } from "../../../share/primeng";

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent {

}
