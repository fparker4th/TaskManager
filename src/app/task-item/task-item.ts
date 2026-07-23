import { Component, input, output } from '@angular/core';

import { Task } from '../model/task';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})
export class TaskItem {
  task = input.required<Task>();
  index = input.required<number>();
  deleteTaskOutput = output<number>();


  constructor() {

  }
  toggleTaskComplete(): void {
    const task = this.task();
    if (task) {
      if (task.status === 'completed') {
        task.status = 'pending';
        delete task.completedAt;
      }
      else {
        task.status = 'completed';
        task.completedAt = new Date();
      }
    }
  }

  isOverdue() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(this.task().dueDate) < today && this.task().status != 'completed';

  }
  deleteTask() {
    this.deleteTaskOutput.emit(this.task().id);
  }
  isTaskCompleted(): boolean {

    return this.task().status === 'completed';
  }

  isTaskCompletedOntime(): boolean {
    let completedAt = this.task().completedAt;
    if (!this.isTaskCompleted() || completedAt == undefined) {
      return false;
    } else if(completedAt ) {
      const dueDate: Date = new Date(this.task().dueDate);
      var compAt = new Date(completedAt);
      compAt.setHours(0, 0, 0, 0);
      dueDate.setHours(1, 0, 0, 0);
      return (dueDate.getTime() > compAt.getTime());
    }
    return false;

  }

}
