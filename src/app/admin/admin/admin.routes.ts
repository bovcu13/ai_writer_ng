import { Routes } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { MemberMgmtComponent } from "../member-mgmt/member-mgmt.component";
import { PointMgmtComponent } from "../point-mgmt/point-mgmt.component";

export const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'member-mgmt', pathMatch: 'full' },
      { path: 'member-mgmt', component: MemberMgmtComponent },
      { path: 'point-mgmt', component: PointMgmtComponent },
    ]
  },
];
