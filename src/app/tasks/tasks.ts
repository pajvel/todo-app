import { Component } from '@angular/core';
import { TaskService, Task } from '../task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class TasksComponent {
  tasks: Task[] = [];
  newTask: Omit<Task, 'id'> = { 
    title: '', 
    description: '', 
    status: 'not completed' 
  };
  showAddForm = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    if (this.newTask.title.trim()) {
      this.taskService.addTask(this.newTask);
      this.newTask = { title: '', description: '', status: 'not completed' };
      this.loadTasks();
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }

  toggleTaskStatus(task: Task) {
    const newStatus = task.status === 'completed' ? 'not completed' : 'completed';
    this.taskService.updateTaskStatus(task.id, newStatus);
    this.loadTasks();
  }
}