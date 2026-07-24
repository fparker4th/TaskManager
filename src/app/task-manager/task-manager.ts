import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Task } from '../model/task';
import { TaskItem } from "../task-item/task-item";
import { TaskManagerService } from '../services/task-manager-service';

@Component({
  selector: 'app-task-manager',
  imports: [CommonModule, FormsModule, TaskItem],
  templateUrl: './task-manager.html',
  styleUrl: './task-manager.scss',
})
export class TaskManager  {
  categories: string[] = ['work', 'personal', 'shopping', 'health', 'finance', 'education', 'other'];
  priorities: string[] = ['low', 'medium', 'high', 'urgent'];
  statuses: string[] = ['pending', 'in-progress', 'completed', 'cancelled'];

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
  filterStatus: string = 'all';
  filterCategory: string = 'all';
  filterPriority: string = 'all';
  showCompleted: boolean = true;
  taskManagerService: TaskManagerService = inject(TaskManagerService)

  getTasks(){
    return this.taskManagerService.getTasks();
  }

  getCompletedTasksCount(): number {
    return this.getTasks().filter(task => task.status === 'completed').length;
  }

  getPendingTasksCount(): number {
    return this.getTasks().filter(task => task.status === 'pending').length;
  }

  getOverdueTasksCount(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.getTasks().filter(task => new Date(task.dueDate) < today && task.status != 'completed').length;
  }

  getCompletionRate(): number {
    if (this.getTasks().length == 0) return 0;
    return Math.round((this.getCompletedTasksCount() / this.getTasks().length) * 100);
  }

  getProductivityLevel(): string {
    const rate = this.getCompletionRate();
    if (rate >= 80) return 'excellent';
    if (rate >= 60) return 'good';
    if (rate >= 40) return 'needs-improvement';
    return 'poor';
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

    this.taskManagerService.addTask(task);
    this.clearForm();
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
    let filtered = [...this.getTasks()];

    if (this.filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === this.filterStatus);
    }

    if (this.filterCategory !== 'all') {
      filtered = filtered.filter(task => task.category === this.filterCategory);
    }

    if (this.filterPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === this.filterPriority);
    }

    if (!this.showCompleted) {
      filtered = filtered.filter(task => task.status !== 'completed');
    }

    return filtered;
  }



}
