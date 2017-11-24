import { Injectable } from '@angular/core';

@Injectable()
export class ListProvider {
  tasks = [];
  
  addTask(task) {
    this.tasks.push({value: task, activate: false});
  }

  editTask(index, task) {
    this.tasks[index] = task;
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
  } 
}
