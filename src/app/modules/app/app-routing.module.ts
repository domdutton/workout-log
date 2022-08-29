import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlansComponent } from './components/plans/plans.component';
import { HomeComponent } from './components/home/home.component';

import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { PlanComponent } from './components/plan/plan.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { BlogsComponent } from './components/blogs/blogs.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['plans']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'plans',
    component: PlansComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'plans/:id',
    component: PlanComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'plans/:id/:eid',
    component: ExerciseComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'blog',
    component: BlogsComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}