import { Service } from '@angular/core';
import { Task } from '../model/task';

@Service()
export class TaskFilterService {
    filterTasks(tasks: Task[],filterStatus: string, filterCategory: string, filterPriority: string, showCompleted: boolean
    ): Task[] {
        let filtered = [...tasks];

        if (filterStatus !== 'all') {
            filtered = filtered.filter(task => task.status === filterStatus);
        }

        if (filterCategory !== 'all') {
            filtered = filtered.filter(task => task.category === filterCategory);
        }

        if (filterPriority !== 'all') {
            filtered = filtered.filter(task => task.priority === filterPriority);
        }

        if (!showCompleted) {
            filtered = filtered.filter(task => task.status !== 'completed');
        }
        return filtered;
    }
}
