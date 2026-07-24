import { Service } from '@angular/core';
import { Task } from '../model/task';

@Service()
export class TaskStatsService {
    getCompletedTasksCount(tasks: Task[]): number {
        return tasks.filter(task => task.status === 'completed').length;
    }

    getPendingTasksCount(tasks: Task[]): number {
        return tasks.filter(task => task.status === 'pending').length;
    }

    getOverdueTasksCount(tasks: Task[]): number {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return tasks.filter(task => new Date(task.dueDate) < today && task.status != 'completed').length;
    }

    getCompletionRate(tasks: Task[]): number {
        if (tasks.length == 0) return 0;
        return Math.round((this.getCompletedTasksCount(tasks) / tasks.length) * 100);
    }

    getProductivityLevel(tasks: Task[]): string {
        const rate = this.getCompletionRate(tasks);
        if (rate >= 80) return 'excellent';
        if (rate >= 60) return 'good';
        if (rate >= 40) return 'needs-improvement';
        return 'poor';
    }
}
