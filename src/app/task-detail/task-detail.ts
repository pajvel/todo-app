import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService, Task } from '../task'; 

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.html',
  styleUrls: ['./task-detail.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class TaskDetailComponent implements OnInit {
  tasks: Task[] = [];
  taskId: number = 0;
  task: Task | undefined; 

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.taskId = Number(params.get('id'));
      this.task = this.taskService.getTaskById(this.taskId);
    });
  }

  goBack() {
    window.history.back();
  }

  toggleStatus(task: Task) {
    task.status = task.status === 'completed' ? 'not completed' : 'completed';

    this.taskService.updateTaskStatus(task.id, task.status);
  }
}
