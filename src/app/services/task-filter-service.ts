import { Service } from '@angular/core';
import { Task } from '../model/task';

@Service()
export class TaskFilterService {
    private filterStatus: string = 'all';
    private filterCategory: string = 'all';
    private filterPriority: string = 'all';
    private showCompleted: boolean = true;
  
    public getFilterStatus(): string {
        return this.filterStatus;
    }
    public setFilterStatus(value: string) {
        this.filterStatus = value;
    }
    public getFilterCategory(): string {
        return this.filterCategory;
    }
    public setFilterCateogry(value: string) {
        this.filterCategory= value;
    }
    public getFilterPriority(): string {
        return this.filterPriority;
    }
    public setFilterPriority(value:string){
        this.filterPriority = value
    }

    getShowCompleted(): boolean{
        return this.showCompleted;
    }
    public setShowCompleted(value:boolean){
        this.showCompleted = value;
    }
    filterTasks(tasks: Task[]): Task[] {
        let filtered = [...tasks];

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
