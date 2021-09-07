import { Subject } from 'rxjs';

import { Exercise } from "./exercise.model";

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    { id: 'situps', name: "Situps", duration: 60 },
    { id: 'squats', name: "Squats", duration: 30 },
    { id: 'lunges', name: "Lunges", duration: 30 },
    { id: 'burpees', name: "Burpees", duration: 60 }
  ];

  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(exercise  => exercise.id === selectedId)
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'completed' });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null)
  }

  getCurrentExercise() {
    return { ...this.runningExercise };
  }

  getExerciseHistory() {
    return this.exercises.slice();
  }
}