import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddUpdateEventComponent } from './add-update-event/add-update-event.component';
import { DisplayCardEventComponent } from './display-card-event/display-card-event.component';
import { EventSchedularComponent } from './event-schedular/event-schedular.component';
import { EventComponent } from './event.component';
import { PastEventComponent } from './past-event/past-event.component';
import { UpdateEventComponent } from './update-event/update-event.component';

@NgModule({
      imports: [RouterModule.forChild([
   { path:'',component:EventComponent},
    {path:'eventAddUpdate',component:AddUpdateEventComponent},
    {path:'DisplayCardEvent',component:DisplayCardEventComponent},
    {path:'EventSchedular',component:EventSchedularComponent},
    {path:'UpdateEvent/:idEvent',component:UpdateEventComponent},
    {path:'PastEvent',component:PastEventComponent},



      ])],
      exports: [RouterModule]
})
export class EventRoutingModule { }
