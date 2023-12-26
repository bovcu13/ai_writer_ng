import { Component } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: 'app-output-history',
  standalone: true,
    imports: [
        ButtonModule,
        CardModule,
        InputTextModule
    ],
  templateUrl: './output-history.component.html',
  styleUrl: './output-history.component.scss'
})
export class OutputHistoryComponent {

}
