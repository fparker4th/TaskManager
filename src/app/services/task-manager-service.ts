import { Service, signal } from '@angular/core';
import { Task } from '../model/task';

@Service()
export class TaskManagerService {
  private tasks = signal<Task[]>([]);
  
  setTasks(tasks:Task[]){
    this.tasks.set(tasks);
  }
  getTasks(): Task[] {
    return this.tasks();
  }
  addTask(task: Task) {
    console.log('adding task', task);
    this.tasks().push(task);
    console.log('new task list', this.tasks());
  }
  removeTask(deleteId: number): void {
    const deleteIndex = this.tasks().findIndex((task) => task.id === deleteId);
    if (deleteIndex != -1) {
      this.tasks().splice(deleteIndex, 1);
    }
  }
  toggleTaskComplete(task: Task): void {
    

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
