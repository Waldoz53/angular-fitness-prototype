import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';

import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer!: number;
  message = "You can do it!"

  constructor(private dialog: MatDialog, private trainingService: TrainingService) {

  }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }
  
  startOrResumeTimer() {
    //uses window.setInterval otherwise editors throw an error that doesn't mean anything? need to research this more.
    const step = this.trainingService.getCurrentExercise().duration / 100 * 1000;
    this.timer = window.setInterval(() => {
      this.progress += 1; //as close to making progress each second (1.666...) without making it annoying to read
      if (this.progress >= 75) {
        this.message = "You're almost there!"
      }
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
        this.message = "You did it!"
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress)
      } else {
        this.startOrResumeTimer();
      }
    });
  }

}
