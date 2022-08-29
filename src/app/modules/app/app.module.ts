import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { PlansComponent } from './components/plans/plans.component';
import { PlanComponent } from './components/plan/plan.component';


@NgModule({
  declarations: [
    PlansComponent,
    PlanComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})

export class AppModule { }
