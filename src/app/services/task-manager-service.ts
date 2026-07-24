import { Service, signal } from '@angular/core';
import { Task } from '../model/task';
import { SignalNode } from '@angular/core/primitives/signals';

@Service()
export class TaskManagerService {
  private tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Complete Angular Assignment',
      description: 'Finish the task manager application with all requirements',
      category: 'education',
      priority: 'high',
      dueDate: new Date('2024-12-15'),
      status: 'in-progress',
      createdAt: new Date('2024-12-01')
    },
    {
      id: 2,
      title: 'Buy Groceries',
      description: 'Milk, Bread, Eggs, Vegetables',
      category: 'shopping',
      priority: 'medium',
      dueDate: new Date('2024-12-10'),
      status: 'pending',
      createdAt: new Date('2024-12-05')
    },
    {
      id: 3,
      title: 'Team Meeting',
      description: 'Discuss Q1 project roadmap',
      category: 'work',
      priority: 'high',
      dueDate: new Date('2024-12-08'),
      status: 'completed',
      createdAt: new Date('2024-12-08'),
      completedAt: new Date('2024-12-08')
    }]);
  init() {
    console.log('service iint');
  }
  getTasks(): any {
    return this.tasks;
  }
  addTask(task: Task) {
    this.tasks().push(task);
  }
  deleteTask(deleteId: number): void {
    const deleteIndex = this.tasks().findIndex((task) => task.id === deleteId);
    if (deleteIndex != -1) {
      this.tasks().splice(deleteIndex, 1);
    }
  }
  toggleTaskComplete(task:Task): void {
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
}
