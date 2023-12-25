import { Routes } from '@angular/router';

import { SettingsComponent } from "./settings/settings.component";
import { ProfileComponent } from "./profile/profile.component";
import { OutputHistoryComponent } from "./output-history/output-history.component";

export const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'OutputHistory', component: OutputHistoryComponent },
    ]
  },
];
