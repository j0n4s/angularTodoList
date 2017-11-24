import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ListProvider } from './ListProvider';

@Component({
  selector: 'app-form',
  templateUrl: './Form.html',
  styleUrls: ['./Form.css']
})
export class FormComponent {
  constructor(public listProvider: ListProvider) {}

  title: any = 'Todo List';
  newTask: any = '';

  add(task) {
    this.listProvider.addTask(task);
    this.newTask = '';
  }

  edit(index, task) {
    task.activate = !task.activate;
    this.listProvider.editTask(index, task);
  }

  remove(task) {
    this.listProvider.removeTask(task);
  }
}
