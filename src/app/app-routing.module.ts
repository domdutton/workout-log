import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogsComponent } from './components/blogs/blogs.component';
import { PlansComponent } from './components/plans/plans.component';
import { AddLogsComponent } from './components/add-logs/add-logs.component';
import { ViewLogsComponent } from './components/view-logs/view-logs.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: "blogs",
    component: BlogsComponent
  },
  {
    path: "plans",
    component: PlansComponent
  },
  {
    path: "AddLogs",
    component: AddLogsComponent
  },
  {
    path: "ViewLogs",
    component: ViewLogsComponent
  },
  {
    path: "Home",
    component: HomeComponent
  },
  { 
    path: "",
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
