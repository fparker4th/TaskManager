import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from '../model/task';
import { TaskManagerService } from '../services/task-manager-service';
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
    this.taskApiService.getTaskById(this.task().id).subscribe(
      (response: Task) => {
        const newStatus = response.status === 'completed'? 'pending' : 'completed';
        const updatedData: Task = {
          ...response,
          status: newStatus,
          completedAt: newStatus === 'completed'? new Date() : null
        };

        this.taskApiService.updateTask(updatedData)
        .subscribe((updatedTask: Task) => {
          this.taskManagerService.toggleTaskComplete(this.task())
        });
      }
    );
  }

  isOverdue() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(this.task().dueDate) < today && this.task().status != 'completed';

  }
  deleteTask() {
    const taskId = this.task().id;
    if (confirm("Are you sure to delete?")) {
      this.taskApiService.deleteTask(taskId).subscribe(
        (response: any) => {
          this.taskManagerService.removeTask(taskId);
        }
      );
    }
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
