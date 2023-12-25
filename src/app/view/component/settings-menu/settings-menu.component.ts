import { Component, OnInit } from '@angular/core';
import { PRIMENG_MODULES } from "../../../share/primeng";
import { NgClass, NgForOf } from "@angular/common";
import { settingsMenu } from "../../../share/data/settings-menu";
import { Router } from "@angular/router";

@Component({
  selector: 'app-settings-menu',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    NgClass,
    NgForOf,
  ],
  templateUrl: './settings-menu.component.html',
  styleUrl: './settings-menu.component.scss'
})
export class SettingsMenuComponent implements OnInit {
  settingsMenu = settingsMenu;

  isActive: number | null = null;

  constructor(private router: Router) {
  }

  ngOnInit() {
    const defaultIndex = this.settingsMenu.findIndex(item => item.name === '帳號設定');
    this.isActive = defaultIndex !== -1 ? defaultIndex : null;
  }

  toggleActive(index: number) {
    this.isActive = index;
    this.router.navigate([this.settingsMenu[index].route]);
  }
}
