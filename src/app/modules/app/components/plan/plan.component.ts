import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from 'src/app/interfaces/exercise.interface';
import { Plan } from 'src/app/interfaces/plan.interface';
import { ExerciseService } from '../../services/exercise-service.service';
import { PlanService } from '../../services/plan-service.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  plan: Plan;
  exercises: Array<Exercise> = [];
  filteredResponses: Array<Exercise> = [];
  selectedResponses: Array<string> = [];
  //TODO: Fix search
  search: string;
  showModal: boolean = false;
  planId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private planService: PlanService,
    private exerciseService: ExerciseService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.planId = params['id'];
    });

    this.planService
      .get(this.planId)
      .then(plan => {
        this.plan = plan;

        this.plan.exercises.forEach(async eid => {
          this.exercises.push(await this.exerciseService.getExercise(eid))
        });

        this.filteredResponses = this.exerciseService.all;
        this.selectedResponses = this.plan.exercises;
      })
      .catch((e) => console.error(e));
  
  }

  onChange() {
    this.filteredResponses = this.exerciseService.all.filter(exercise => exercise.name.includes(this.search));
  }

  updateList(eid: string) {
    if(this.selectedResponses.includes(eid)) this.selectedResponses.splice(this.selectedResponses.indexOf(eid), 1);
    else this.selectedResponses.push(eid);
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  onSubmit() {
    this.planService
        .addNewExercises(this.plan, this.selectedResponses)
        .then(() => {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(["plans", this.planId]));
        })
        .catch((e) => console.log(e.message));
  }
}

