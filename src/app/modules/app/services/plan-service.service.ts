import { nanoid } from 'nanoid';

import { where } from '@firebase/firestore';

import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import { DBService } from 'src/app/services/db-service.service';

import { Plan } from 'src/app/interfaces/plan.interface'

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  constructor(private readonly auth: Auth, private readonly dbService: DBService) {}

  getAllPlans() {
    return this.dbService.find("Plans", where("author", "==", this.auth.currentUser?.uid))
  }

  get(id: string) {
    return this.dbService.get<Plan>("Plans", id);
  }

  addNewExercises(plan: Plan, eid: Array<string>) {
    plan.exercises = [...new Set(plan.exercises.concat(eid))];
    return this.dbService.update<Plan>("Plans", {
      ...plan
    })
  }

  createNewPlan({ title, description }: Plan) {
    return this.dbService.create<Plan>("Plans", {
      id: nanoid(),
      author: this.auth.currentUser?.uid!,
      title: title,
      description: description,
      exercises: []
    })
  }
}
