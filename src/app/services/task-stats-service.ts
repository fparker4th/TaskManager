import { inject, Service } from '@angular/core';
import { Task } from '../model/task';
import { TaskManagerService } from './task-manager-service';

@Service()
export class TaskStatsService {
    taskMangerService: TaskManagerService = inject(TaskManagerService);
    getCompletedTasksCount(): number {
        return this.taskMangerService.getTasks().filter(task => task.status === 'completed').length;
    }

    getPendingTasksCount(): number {
        return this.taskMangerService.getTasks().filter(task => task.status === 'pending').length;
    }

    getOverdueTasksCount(): number {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.taskMangerService.getTasks().filter(task => new Date(task.dueDate) < today && task.status != 'completed').length;
    }

    getCompletionRate(): number {
        const tasks:Task[] = this.taskMangerService.getTasks()
        if (tasks.length == 0) return 0;
        return Math.round((this.getCompletedTasksCount() / tasks.length) * 100);
    }

    getProductivityLevel(): string {
        const rate = this.getCompletionRate();
        if (rate >= 80) return 'excellent';
        if (rate >= 60) return 'good';
        if (rate >= 40) return 'needs-improvement';
        return 'poor';
    }
}
