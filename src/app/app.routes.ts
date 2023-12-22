import { Routes } from '@angular/router';

import { LoginComponent } from "./view/component/login/login.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '', loadChildren: () => import('./view/container/container.routes').then(m => m.routes) },
];
