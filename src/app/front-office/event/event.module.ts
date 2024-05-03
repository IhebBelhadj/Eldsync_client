import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular'; // import the FullCalendar module
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

import { AutoCompleteModule } from 'primeng/autocomplete';

import { InputTextareaModule } from 'primeng/inputtextarea';





import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { AddUpdateEventComponent } from './add-update-event/add-update-event.component';
import { DisplayCardEventComponent } from './display-card-event/display-card-event.component';
import { EventRoutingModule } from './event-routing.module';
import { EventSchedularComponent } from './event-schedular/event-schedular.component';
import { EventComponent } from './event.component';
import { PastEventComponent } from './past-event/past-event.component';
import { UpdateEventComponent } from './update-event/update-event.component';





@NgModule({

  imports: [
    DatePipe,
    FileUploadModule,
    CardModule,
    DialogModule,
    FullCalendarModule, // add the FullCalendarModule to your imports
    CalendarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EventRoutingModule,
    InputGroupAddonModule,
    InputGroupModule ,
    HttpClientModule,
    DropdownModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    InputNumberModule,
    ButtonModule,
    AutoCompleteModule,
    

  ],
  declarations: [
    EventComponent,
    AddUpdateEventComponent,
    PastEventComponent,
    DisplayCardEventComponent,
    EventSchedularComponent,
    UpdateEventComponent,
]



})
export class EventModule { }
