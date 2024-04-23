import { Component } from '@angular/core';
import { Task } from '../../medication/model/task';
import { ConsumerTaskService } from '../../medication/services/consumer-task.service';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
    taskForm: FormGroup;
    taskFrequencies: { label: string, value: any }[];
    taskPriorities: { label: string, value: any }[];
  
    constructor(private fb: FormBuilder, private taskService: ConsumerTaskService, private router: Router) {
  
      this.taskForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        date: ['', Validators.required],
        endDate: [''],
        time: ['', Validators.required],
        priority: ['', Validators.required],
        recurrence: [''],
        assignedSenior: ['', Validators.required],
      });
    }
  
    save() {
      if (this.taskForm.valid) {
        this.taskService.addTask(this.taskForm.value).subscribe(
          () => {
            console.log('Task successfully saved');
            this.router.navigateByUrl('/uikit/task');
          },
          (error) => {
            console.error('Error occurred while saving task:', error);
            // Gérer l'erreur ici, par exemple, afficher un message à l'utilisateur
          }
        );
      } else {
        console.error('Form validation failed. Please fill all required fields correctly.');
      }
    }
priorityOptions: any[] = [
    {label: 'Low', value: 'Low'},
    {label: 'Medium', value: 'Medium'},
    {label: 'High', value: 'High'}
];
ReccurrenceOptions: any[] = [
    {label: 'Daily', value: 'Daily'},
    {label: 'weekly', value: 'weekly'}
];

seniorOptions: any[] = [
    {id: 1, name: 'John Doe'},
    {id: 2, name: 'Jane Smith'},
    // Ajoutez d'autres options pour les personnes âgées si nécessaire
];


  
}


