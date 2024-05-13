import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { DetailItemComponent } from './detail-item/detail-item.component';
import { InventoryComponent } from './inventory.component';
import { LogsItemsComponent } from './logs-items/logs-items.component';
import { StatsItemsComponent } from './stats-items/stats-items.component';
import { UpdateItemComponent } from './update-item/update-item.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path:'',component:InventoryComponent},
    { path:'AddItem',component:AddItemComponent},
    { path: 'DetailItem/:id', component: DetailItemComponent },
    { path:'LogsItem',component:LogsItemsComponent},
    { path: 'UpdateItem/:id', component: UpdateItemComponent },
    { path: 'StatsItem', component: StatsItemsComponent },






])],
exports: [RouterModule]
})
export class InventoryRoutingModule { }
