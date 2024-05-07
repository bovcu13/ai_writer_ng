import { Routes } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { MemberMgmtComponent } from "../member-mgmt/member-mgmt.component";
import { MemberViewComponent } from "../member-mgmt/member-view/member-view.component";
import { PointMgmtComponent } from "../point-mgmt/point-mgmt.component";

export const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'member-mgmt', pathMatch: 'full' },
      { path: 'member-mgmt', component: MemberMgmtComponent },
      { path: 'member-mgmt/:id', component: MemberViewComponent},
      { path: 'point-mgmt', component: PointMgmtComponent },
    ]
  },
];
