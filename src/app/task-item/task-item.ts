import { Component, inject, input, output } from '@angular/core';

import { Task } from '../model/task';
import { TaskManagerService } from '../services/task-manager-service';
import { CommonModule } from '@angular/common';
import { PriorityPipe } from '../pipes/priority-pipe';
import { StatusLabelPipe } from '../pipes/status-label-pipe';
import { TaskApiService } from '../services/task-api-service';

@Component({
  selector: 'app-task-item',
  imports: [CommonModule, PriorityPipe, StatusLabelPipe],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})
export class TaskItem {
  task = input.required<Task>();
  index = input.required<number>();
  taskManagerService: TaskManagerService = inject(TaskManagerService);
  taskApiService: TaskApiService = inject(TaskApiService);


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
    const taskId = this.task().id;
    this.taskApiService.deleteTask(taskId)
      .subscribe(() => {
        this.taskManagerService.removeTask(taskId);
      });

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
