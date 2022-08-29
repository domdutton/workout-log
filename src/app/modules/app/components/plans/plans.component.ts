import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PlanService } from 'src/app/modules/app/services/plan-service.service';

import { Plan } from 'src/app/interfaces/plan.interface';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
})
export class PlansComponent implements OnInit {
  form: FormGroup;
  plans: Array<Plan> = [];
  showModal: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private planService: PlanService
  ) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  ngOnInit(): void {
    this.planService
      .getAllPlans()
      .then((plans) =>
        plans.forEach((plan) => this.plans.push(plan.data() as Plan))
      )
      .catch((e) => console.error(e));
  }

  onSubmit() {
    this.planService
      .createNewPlan(this.form.value)
      .then(() => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['plans']));
      })
      .catch((e) => console.log(e.message));
  }
}
