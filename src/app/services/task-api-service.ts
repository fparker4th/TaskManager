import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Service()
export class TaskApiService {
    http: HttpClient = inject(HttpClient);
    private apiUrl: string = 'http://localhost:3000';

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
    }
    createTask(task: Task): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}/tasks`,
            task
        );
    }
    deleteTask(taskId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/tasks/${taskId}`);
    }

}
