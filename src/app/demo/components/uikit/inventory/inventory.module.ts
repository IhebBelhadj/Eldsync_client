import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';









import { ChartModule } from 'primeng/chart';
import { AddItemComponent } from './add-item/add-item.component';
import { DetailItemComponent } from './detail-item/detail-item.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { LogsItemsComponent } from './logs-items/logs-items.component';
import { LowInventoryAlertItemsComponent } from './low-inventory-alert-items/low-inventory-alert-items.component';
import { StatsItemsComponent } from './stats-items/stats-items.component';
import { UpdateItemComponent } from './update-item/update-item.component';

@NgModule({
  declarations: [InventoryComponent,AddItemComponent,DetailItemComponent,LogsItemsComponent,UpdateItemComponent,StatsItemsComponent,LowInventoryAlertItemsComponent],
  imports: [
    DialogModule,
    CommonModule,
    ChartModule,
    InventoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
      ]
})
export class InventoryModule { }
