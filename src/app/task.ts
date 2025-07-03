import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'not completed' | 'completed';
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly STORAGE_KEY = 'todo_app_tasks';
  private nextId = 1;

  constructor() {
    this.initIdCounter();
  }

  private initIdCounter(): void {
    const tasks = this.getTasks();
    this.nextId = tasks.length > 0 
      ? Math.max(...tasks.map(t => t.id)) + 1 
      : 1;
  }

  getTasks(): Task[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  getTaskById(id: number): Task | undefined {
    return this.getTasks().find(task => task.id === id);
  }

  addTask(task: Omit<Task, 'id'>): void {
    const tasks = this.getTasks();
    const newTask = { 
      ...task, 
      id: this.nextId++,
      status: task.status || 'not completed'
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...tasks, newTask]));
  }

  deleteTask(id: number): void {
    const tasks = this.getTasks().filter(task => task.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  updateTaskStatus(id: number, status: 'completed' | 'not completed'): void {
    const tasks = this.getTasks().map(task => 
      task.id === id ? { ...task, status } : task
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }
}