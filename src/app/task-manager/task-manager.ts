import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Task } from '../model/task';
import { TaskItem } from "../task-item/task-item";
import { TaskManagerService } from '../services/task-manager-service';
import { TaskFilterService } from '../services/task-filter-service';
import { TaskStatsService } from '../services/task-stats-service';
import { PriorityPipe } from '../pipes/priority-pipe';
import { StatusLabelPipe } from '../pipes/status-label-pipe';
import { TaskApiService } from '../services/task-api-service';

@Component({
  selector: 'app-task-manager',
  imports: [CommonModule, FormsModule, StatusLabelPipe, PriorityPipe, TaskItem],
  templateUrl: './task-manager.html',
  styleUrl: './task-manager.scss',
})
export class TaskManager implements OnInit {
  categories: string[] = ['work', 'personal', 'shopping', 'health', 'finance', 'education', 'other'];
  priorities: string[] = ['low', 'medium', 'high', 'urgent'];
  statuses: string[] = ['pending', 'in-progress', 'completed', 'cancelled'];
  private taskApiService: TaskApiService = inject(TaskApiService);
  private taskManagerService: TaskManagerService = inject(TaskManagerService)
  private taskFilterService: TaskFilterService = inject(TaskFilterService);
  private taskStatsService: TaskStatsService = inject(TaskStatsService);

  //Form data
  newTask: {
    title: string,
    description: string,
    category: string,
    priority: string,
    dueDate: string | Date,
    status: string
  } = {
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      dueDate: '',
      status: 'pending'
    };

  //Filter controls



  get filterStatus() {
    return this.taskFilterService.getFilterStatus();
  }
  set filterStatus(value) {
    this.taskFilterService.setFilterStatus(value);
  }
  get filterCategory() {
    return this.taskFilterService.getFilterCategory();
  }
  set filterCategory(value) {
    this.taskFilterService.setFilterCateogry(value);
  }
  get filterPriority() {
    return this.taskFilterService.getFilterPriority();
  }
  set filterPriority(value) {
    this.taskFilterService.setFilterPriority(value);
  }
  get showCompleted() {
    return this.taskFilterService.getShowCompleted();
  }
  set showCompleted(value) {
    this.taskFilterService.setShowCompleted(value);
  }
  getTasks() {
    return this.taskManagerService.getTasks();
  }

  getCompletedTasksCount(): number {
    return this.taskStatsService.getCompletedTasksCount();
  }

  ngOnInit(): void {
    this.taskApiService.getTasks()
      .subscribe((tasks: Task[]) => {
        this.taskManagerService.setTasks(tasks);
      });
  }
  getPendingTasksCount(): number {
    return this.taskStatsService.getPendingTasksCount()
  }

  getOverdueTasksCount(): number {
    return this.taskStatsService.getOverdueTasksCount()

  }

  getCompletionRate(): number {
    return this.taskStatsService.getCompletionRate();

  }

  getProductivityLevel(): string {
    return this.taskStatsService.getProductivityLevel();

  }
  onFieldFocus(field: string): void {
    //Could add validation feedback here
  }

  onFieldBlur(field: string): void {
    //Could add validation feedback here
  }
  addTask(): void {
    if (!this.newTask.title || !this.newTask.category || !this.newTask.dueDate) {
      return;
    }

    const task: Task = {
      id: Date.now(),
      title: this.newTask.title,
      description: this.newTask.description,
      category: this.newTask.category,
      priority: this.newTask.priority,
      dueDate: new Date(this.newTask.dueDate),
      status: this.newTask.status,
      createdAt: new Date()
    };
    this.taskApiService.createTask(task).subscribe((newTask) => {
      this.taskManagerService.addTask(task);
      this.clearForm();
    });
  }

  clearForm(): void {
    this.newTask = {
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      dueDate: '',
      status: 'pending'
    };
  }

  getFilteredTasks(): Task[] {
    return this.taskFilterService.filterTasks(this.getTasks());
  }



}
