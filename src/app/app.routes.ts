import { Routes } from '@angular/router';

import { HomeComponent } from "./view/home/home.component";
import { ReplyComponent } from "./view/reply/reply.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'reply', component: ReplyComponent },
];
