import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { TaskRoutingModule } from './task-routing.module';
import { TasksComponent } from './tasks.component';
import { Task } from '../medication/model/task';




@NgModule({
  declarations: [AddTaskComponent,UpdateTaskComponent,TasksComponent],
  imports: [
        CommonModule,
		TaskRoutingModule,
        FormsModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
		ReactiveFormsModule,
		TableModule,
		ReactiveFormsModule,
        DropdownModule,
        DialogModule
        


  ]
})
export class TaskModule { }
