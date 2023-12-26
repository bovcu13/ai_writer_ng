import { Routes } from '@angular/router';

import { SettingsComponent } from "./settings/settings.component";
import { ProfileComponent } from "./profile/profile.component";
import { OutputHistoryComponent } from "./output-history/output-history.component";
import { SafetyComponent } from "./safety/safety.component";
import { SubscriptionComponent } from "./subscription/subscription.component";

export const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'outputHistory', component: OutputHistoryComponent },
      { path: 'safety', component: SafetyComponent },
      { path: 'subscription', component: SubscriptionComponent },
    ]
  },
];
