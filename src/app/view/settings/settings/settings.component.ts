import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { ToolbarComponent } from "../../component/toolbar/toolbar.component";
import { SettingsMenuComponent } from "../../component/settings-menu/settings-menu.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarComponent,
    SettingsMenuComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
