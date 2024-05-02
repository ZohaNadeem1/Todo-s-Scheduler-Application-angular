
// import { Component } from '@angular/core';


// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {

//   title = 'TodoList with Angular';
//   taskDateAndTime : Date = new Date();
//   newTask:string = '' ;
//   list:any[]=[];

//   addTask(item:string){
//     this.list.push({id:this.list.length , name:item}); 
//     // this.taskDateAndTime.getDate();
// console.warn(this.list);

// }

// removeTask(id:number): void{
// console.warn(id);
// this.list = this.list.filter(item=> item.id!==id);
//   }
// }


import { Component, HostListener, OnInit } from '@angular/core';
import { SchedulerService } from './services/scheduler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
}) 
export class AppComponent implements OnInit {  
  title = 'TodoList with Angular';
  newTask: String = '';
  taskName : String = '';
  taskDate !: Date;
  taskAssignTo : String = '';
  taskDescription: String = '';
  scheduledTasks: any  = [];
  list: any[] = [];

constructor(private scheduler:SchedulerService){}

  ngOnInit(): void {
   
    this.scheduler.scheduledTasks$.subscribe(

      task => {
        this.scheduledTasks.push(task)
      }

    )
  }

@HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'r') {
      event.preventDefault();
      console.log('Ctrl + R was pressed. Page refresh prevented.');
    }
  }

  addTask(taskName: String, date: Date,taskAssignTo:String, taskDescription:String ) {

    // if (taskName && date && taskAssignTo && taskDescription)
     {

      this.list.push({ id: this.list.length, name: taskName, date: date, taskAssignTo:taskAssignTo, taskDescription:taskDescription });

      console.warn(this.list);

      // this.newTask = '';  // Reset the task input field
      // this.taskDate = ''; // Reset the date input field
      //  = ''; // Reset the time input field
      

    } 
    // else {
    //   alert("Please fill all fields");
    // }

    this.scheduler.schedulerTodo( new Date (this.taskDate), taskName, taskAssignTo)
  }

  

  removeTask(id: number): void {
    console.warn(id);
    
    this.list = this.list.filter(item => item.id !== id);
  }
}
