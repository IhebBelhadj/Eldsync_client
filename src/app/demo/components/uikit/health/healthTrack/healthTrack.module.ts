import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthTrackRoutingModule } from './healthTrack-routing.module';
import { HealthTrackComponent } from './healthTrack.component';
import {ChartModule} from "primeng/chart";
import {SplitButtonModule} from "primeng/splitbutton";
import {StepsModule} from "primeng/steps";
import {TabMenuModule} from "primeng/tabmenu";

@NgModule({
    imports: [
        CommonModule,
        HealthTrackRoutingModule,
        ChartModule,
        SplitButtonModule,
        StepsModule,
        TabMenuModule


    ],
    declarations: [HealthTrackComponent]
})
export class HealthTrackModule { }