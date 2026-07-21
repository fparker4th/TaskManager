import { Routes } from '@angular/router';
import { TaskManager } from './task-manager/task-manager';
import { Home } from './home/home';

export const routes: Routes = [
    { path: 'dashboard', component: TaskManager },
    {path: 'home', component: Home },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard' }
];
