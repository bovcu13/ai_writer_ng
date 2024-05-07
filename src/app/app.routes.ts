import { Routes } from '@angular/router';

import { LoginComponent } from "./view/component/login/login.component";
import { authGuard } from "./share/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    loadChildren: () => import('./view/container/container.routes').then(m => m.routes),

  },
  {
    path: 'settings',
    loadChildren: () => import('./view/settings/settings.routes').then(m => m.routes),

  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin/admin.routes').then(m => m.routes),

  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
