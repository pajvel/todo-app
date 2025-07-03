import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks';
import { TaskDetailComponent } from './task-detail/task-detail';

export const routes: Routes = [
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];
