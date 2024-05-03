import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventUserAddComponent } from './event-user-add/event-user-add.component';
import { EventUserCalenderComponent } from './event-user-calender/event-user-calender.component';
import { EventUserComponent } from './event-user.component';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path:'',component:EventUserComponent},
    {path:'eventUserAdd',component:EventUserAddComponent},
    {path:'eventUserCalender',component:EventUserCalenderComponent},


  
 
 
 
       ])],
       exports: [RouterModule]
})
export class EventUserRoutingModule { }
