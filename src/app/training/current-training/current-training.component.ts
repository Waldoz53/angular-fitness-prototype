import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer!: number;
  message = "You can do it!"

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }
  
  startOrResumeTimer() {
    //uses window.setInterval otherwise editors throw an error that doesn't mean anything? need to research this more.
    this.timer = window.setInterval(() => {
      this.progress += 2; //as close to making progress each second (1.666...) without making it annoying to read
      if (this.progress >= 75) {
        this.message = "You're almost there!"
      }
      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.message = "You did it!"
      }
    }, 1000);
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
        this.trainingExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }

}
