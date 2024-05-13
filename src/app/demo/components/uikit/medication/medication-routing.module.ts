import { NgModule } from '@angular/core';
import { AddMedicationComponent } from './add-medication/add-medication.component';
import { UpdateMedicationComponent } from './update-medication/update-medication.component';
import { RouterModule,Routes } from '@angular/router';
import { MedicationComponent } from './medication.component';
import { CalendarMedicationComponent } from './calendar-medication/calendar-medication.component';

const routes: Routes = [
  { path: '', component: MedicationComponent },
  { path: 'add', component: AddMedicationComponent },
  { path: 'update/:id', component: UpdateMedicationComponent },
  { path: 'calendarMedication',component:CalendarMedicationComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicationRoutingModule { }
