import { Component } from '@angular/core';
import { PRIMENG_MODULES } from "../../../share/primeng";
import { output_history } from "../../../share/data/output-history";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-output-history',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    DatePipe
  ],
  templateUrl: './output-history.component.html',
  styleUrl: './output-history.component.scss'
})
export class OutputHistoryComponent {
  output_history = output_history;

}
