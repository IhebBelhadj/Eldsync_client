import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicationRoutingModule } from './medication-routing.module';
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
import { AddMedicationComponent } from './add-medication/add-medication.component';
import { UpdateMedicationComponent } from './update-medication/update-medication.component';
import { MedicationComponent } from './medication.component';
import { TableModule } from 'primeng/table';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarMedicationComponent } from './calendar-medication/calendar-medication.component';
import { DialogModule } from 'primeng/dialog';




@NgModule({
  declarations: [AddMedicationComponent,UpdateMedicationComponent,MedicationComponent,CalendarMedicationComponent],
  imports: [
        CommonModule,
        MedicationRoutingModule,
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
		FullCalendarModule,
		DialogModule


  ]
})
export class MedicamentsModule { }
