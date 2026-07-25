import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Service()
export class TaskApiService {
    http:HttpClient = inject(HttpClient);
    private apiUrl: string = 'http://localhost:3000';

    getTasks():Observable<Task[]>{
        return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
    }

}
