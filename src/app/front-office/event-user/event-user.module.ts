import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular'; // import the FullCalendar module
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';



import { PaginatorModule } from 'primeng/paginator';
import { EventUserAddComponent } from './event-user-add/event-user-add.component';
import { EventUserAttendenceComponent } from './event-user-attendence/event-user-attendence.component';
import { EventUserCalenderComponent } from './event-user-calender/event-user-calender.component';
import { EventUserRecommandedComponent } from './event-user-recommanded/event-user-recommanded.component';
import { EventUserRoutingModule } from './event-user-routing.module';
import { EventUserComponent } from './event-user.component';




@NgModule({
    imports: [
      CommonModule,
      ToastModule,
      HttpClientModule,
      ReactiveFormsModule,
      DatePipe,
      FormsModule,
      PaginatorModule,
      FullCalendarModule,
      TableModule,
ButtonModule,
CalendarModule,
CardModule,
DialogModule,
DropdownModule,
InputGroupModule,
InputGroupAddonModule,
InputNumberModule,
InputTextModule,
AutoCompleteModule,
InputTextareaModule,
EventUserRoutingModule
  ],
  
  declarations: [EventUserComponent,EventUserAddComponent,EventUserCalenderComponent,EventUserAttendenceComponent,EventUserRecommandedComponent]
})
export class EventUserModule { }
