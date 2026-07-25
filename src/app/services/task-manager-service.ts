import { Service, signal } from '@angular/core';
import { Task } from '../model/task';
import { SignalNode } from '@angular/core/primitives/signals';

@Service()
export class TaskManagerService {
  private tasks = signal<Task[]>([]);
  init() {
    console.log('service iint');
  }
  setTasks(tasks:Task[]){
    this.tasks.set(tasks);
  }
  getTasks(): Task[] {
    return this.tasks();
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
