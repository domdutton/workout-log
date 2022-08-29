import { Injectable } from '@angular/core';
import { Exercise } from 'src/app/interfaces/exercise.interface';
import exercises from 'src/assets/data/exercises.json';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  all = exercises;

  constructor() {}

  getExercise(id: string): Exercise {
    return exercises.find((item: Exercise) => item.id === id) as Exercise;
  }
}
