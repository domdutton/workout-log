import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from 'src/app/interfaces/exercise.interface';
import { Plan } from 'src/app/interfaces/plan.interface';
import { ExerciseService } from '../../services/exercise-service.service';
import { PlanService } from '../../services/plan-service.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  form: FormGroup;
  exercise: Exercise;
  plan: Plan;

  constructor(
    private exerciseService: ExerciseService,
    private planService: PlanService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      reps: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.planService.get(params['id']).then((plan) => {
        this.plan = plan;
        this.setOptions();
      });
      this.exercise = this.exerciseService.getExercise(params['eid']);
    });
  }

  private setOptions() {
    let logs: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.plan.logs
      .filter(
        (log) =>
          log.eid == this.exercise.id)
      .forEach((log) => {
        logs[(log.date as any).toDate().getMonth()] += log.value;
      });

    let months = [
      'January',
      'Febuary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let data: { dates: Array<string>, values: Array<number> } = { dates: [], values: [] };
    [
      new Date().getMonth() - 1,
      new Date().getMonth(),
      new Date().getMonth() + 1,
    ].forEach((index) => {
      data.dates.push(months[index]);
      data.values.push(logs[index]);
    });

    console.log(data);

    this.options = {
      grid: {
        //prevents cutoff of y-axis labels
        left: '15%',
      },
      xAxis: {
        type: 'category',
        data: data.dates,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data.values,
          type: 'line',
          smooth: true,
        },
      ],
    };
  }

  onSubmit() {
    this.planService
      .addLog(
        this.plan,
        this.exercise.id,
        new Date(),
        this.form.get('reps')!.value
      )
      .then(() => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() =>
            this.router.navigate(['plans', this.plan.id, this.exercise.id])
          );
      });
  }

  capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  options: any;
}
