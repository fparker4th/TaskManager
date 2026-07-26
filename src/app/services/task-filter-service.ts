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
    
}
