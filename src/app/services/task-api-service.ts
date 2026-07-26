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
    getTaskById(id: number): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`);
    }
    createTask(task: Task): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}/tasks`,
            task
        );
    }
    deleteTask(taskId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/tasks/${taskId}`);
    }
    updateTask(task: Task): Observable<any> {
        return this.http.put(`${this.apiUrl}/tasks/${task.id}`,
            task
        );
    }

}
