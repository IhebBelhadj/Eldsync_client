import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../medication/model/task';
import { ConsumerTaskService } from '../medication/services/consumer-task.service';
import { Elder } from '../medication/model/Elder';
import { StatusTask } from '../medication/model/StatusTask';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  todos: Task[] = [];
  searchTerm: string = '';
  isSlidePanelOpen: boolean = false;
  isUpdateDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  isDetailDialogOpen: boolean = false;

  selectedTask: Task | null = null;
  updateTaskForm: FormGroup;
  statusTask: { label: string, value: any }[];
  isNotificationDialogOpen: boolean = false;
  notificationMessage: string = '';
  elders: Elder[] = []; 

  completedTaskCount: number = 0;
  cancelledTaskCount: number = 0;
  todoTaskCount: number = 0;
  tasksForTodayCount: number = 0;

  constructor(private fb: FormBuilder, private taskService: ConsumerTaskService) {
    this.statusTask = Object.values(StatusTask).map(status => ({ label: status, value: status }));

    this.updateTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      date: ['', Validators.required],
      elder: [null] 
    });
  }

  ngOnInit(): void {
    this.loadTasks();
    this.loadTasksForTodayCount(); 
    this.loadAnalytics();
    this.fetchElders(); // Correction du nom de la méthode
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (tasks: Task[]) => {
        this.todos = tasks;
        this.loadTasksForTodayCount();
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  loadTasksForTodayCount(): void {
    this.taskService.getTasksForTodayCount().subscribe(
      count => {
        this.tasksForTodayCount = count;
        this.showNotification("Nombre de tâches à faire pour aujourd'hui : " + this.tasksForTodayCount);
      },
      error => {
        console.error('Error loading tasks for today count:', error);
      }
    );
  }

  showNotification(message: string) {
    this.notificationMessage = message;
    this.isNotificationDialogOpen = true;
  }  

  openTaskFormDialog() {
    this.isSlidePanelOpen = true;
    this.updateTaskForm.reset();
  }

  fetchElders() {
    this.taskService.getElders().subscribe(
      elders => {
        this.elders = elders;
      },
      error => {
        console.error('Error fetching elders:', error);
      }
    );
  }

  onSubmit() {
    if (this.updateTaskForm.valid) {
      console.log('Form is valid, submitting...');
      const formData = this.updateTaskForm.value;
      const elderUsername: string = formData.elder.username;

      this.taskService.addTask(formData, elderUsername).subscribe(
        (createdTask: Task) => {
          this.todos.unshift(createdTask);
          console.log('Task created successfully');
          this.isSlidePanelOpen = false;
        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );
    } else {
      console.log('Form is invalid, please fill all fields correctly.');
    }
  }

  openUpdateDialog(task: Task) {
    this.selectedTask = task;
    this.updateTaskForm.patchValue({
      title: task.title,
      description: task.description,
      status: task.status
    });
    this.isUpdateDialogOpen = true;
  }

  onUpdate() {
    if (this.updateTaskForm.valid && this.selectedTask) {
      console.log('Form is valid, updating task...');
      const formData = this.updateTaskForm.value;
      formData.id = this.selectedTask.id;

      this.taskService.updateTask(formData, this.selectedTask.id).subscribe(
        (updatedTask: Task) => {
          const index = this.todos.findIndex(t => t.id === updatedTask.id);
          if (index !== -1) {
            this.todos[index] = updatedTask;
          }
          console.log('Task updated successfully');
          this.isUpdateDialogOpen = false;
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    } else {
      console.log('Form is invalid, please fill all fields correctly.');
    }
  }

  openDeleteDialog(task: Task) {
    this.selectedTask = task;
    this.isDeleteDialogOpen = true;
  }

  onDeleteConfirm() {
    if (this.selectedTask) {
      this.taskService.deleteTask(this.selectedTask.id).subscribe(
        () => {
          this.todos = this.todos.filter(t => t.id !== this.selectedTask!.id);
          console.log('Task deleted successfully');
          this.isDeleteDialogOpen = false;
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }

  showTaskDetails(task: Task) {
    this.selectedTask = task;
    this.isDetailDialogOpen = true;
  }

  markTaskAsCompleted(taskId: number) {
    this.taskService.markTaskAsCompleted(taskId).subscribe(
      () => {
        this.loadTasks();
      },
      error => {
        console.error('Error marking task as completed:', error);
      }
    );
  }

  markTaskAsCancelled(taskId: number) {
    this.taskService.markTaskAsCancelled(taskId).subscribe(
      () => {
        this.loadTasks();
      },
      error => {
        console.error('Error marking task as cancelled:', error);
      }
    );
  }

  loadAnalytics() {
    this.taskService.getCompletedTaskCount().subscribe(
      count => {
        this.completedTaskCount = count;
      },
      error => {
        console.error('Error loading completed task count:', error);
      }
    );

    this.taskService.getCancelledTaskCount().subscribe(
      count => {
        this.cancelledTaskCount = count;
      },
      error => {
        console.error('Error loading cancelled task count:', error);
      }
    );

    this.taskService.getTodoTaskCount().subscribe(
      count => {
        this.todoTaskCount = count;
      },
      error => {
        console.error('Error loading todo task count:', error);
      }
    );
  }
}
