import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  scheduledTasks = new Subject<string>();
  scheduledTasks$ = this.scheduledTasks.asObservable();

  constructor() { }

  schedulerTodo(time: Date, title: String, taskAssign: String) {
    let currentTime = new Date();
    let scheduledAt = time.getTime() - currentTime.getTime();

    setTimeout(() => {
      const myAudio = new Audio('../assets/Audios/tone.mp3');
      
      myAudio.play().then(() => {
        let alarmPrompt = confirm(`The task ${title.toUpperCase()} should be performed by ${taskAssign.toUpperCase()}`);
        if (alarmPrompt) {
          myAudio.pause();
        } else {
          console.log("Audio is not played");
        }
        this.scheduledTasks.next(`The task ${title.toUpperCase()} has been performed`);
      }).catch(e => console.error("Error playing audio: ", e));

    }, scheduledAt);
  }
}
