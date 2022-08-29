import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';

import { PlansComponent } from './components/plans/plans.component';
import { PlanComponent } from './components/plan/plan.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { BlogsComponent } from './components/blogs/blogs.component';

@NgModule({
  declarations: [PlansComponent, PlanComponent, ExerciseComponent, BlogsComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class AppModule {}
