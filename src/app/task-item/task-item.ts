import { Component, inject, input, output } from '@angular/core';

import { Task } from '../model/task';
import { TaskManagerService } from '../services/task-manager-service';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})
export class TaskItem {
  task = input.required<Task>();
  index = input.required<number>();
  taskManagerService: TaskManagerService = inject(TaskManagerService)


  toggleTaskComplete(): void {
    const task = this.task();
    this.taskManagerService.toggleTaskComplete(task);
  }

  isOverdue() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(this.task().dueDate) < today && this.task().status != 'completed';

  }
  deleteTask() {
    this.taskManagerService.deleteTask(this.task().id);
  }
  isTaskCompleted(): boolean {

    return this.task().status === 'completed';
  }

  isTaskCompletedOntime(): boolean {
    let completedAt = this.task().completedAt;
    if (!this.isTaskCompleted() || completedAt == undefined) {
      return false;
    } else if (completedAt) {
      const dueDate: Date = new Date(this.task().dueDate);
      var compAt = new Date(completedAt);
      compAt.setHours(0, 0, 0, 0);
      dueDate.setHours(1, 0, 0, 0);
      return (dueDate.getTime() > compAt.getTime());
    }
    return false;

  }

}
