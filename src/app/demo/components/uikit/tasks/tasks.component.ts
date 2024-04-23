import { Component } from '@angular/core';
import { ConsumerTaskService } from '../medication/services/consumer-task.service';
import { Router } from '@angular/router';
import { Task } from '../medication/model/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  taskList: Task[] = [];
  searchTerm: string = '';
  displayDialog: boolean = false;
  selectedTask: Task;

  constructor(private taskService: ConsumerTaskService, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
        this.taskList = data;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      }
    });
  }

  goToAddTaskForm(): void {
    this.router.navigate(['/uikit/task/add']);
  }

  showDialog(task: Task): void {
    this.selectedTask = task;
    this.displayDialog = true;
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  goToUpdateTaskForm(id: number): void {
    this.router.navigate(['/uikit/task/update', id]);
  }
}
