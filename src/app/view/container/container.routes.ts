import { Routes } from '@angular/router';
import { ContainerComponent } from "./container.component";
import { HomeComponent } from "../home/home.component";
import { ReplyComponent } from "../reply/reply.component";

export const routes: Routes = [
  {
    path: '', component: ContainerComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'reply', component: ReplyComponent },
    ]
  },
];
