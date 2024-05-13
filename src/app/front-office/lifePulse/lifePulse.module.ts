import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifePulseRoutingModule } from './lifePulse-routing.module';
import { LifePulseComponent } from './lifePulse.component';
import {TabsComponent} from "./bottomTabs/tabs.component";
import {RightTabsComponent} from "./rightTabs/rightTabs.component";
import {MeasurementsBarComponent} from "./measurementsBar/measurementsBar.component";


@NgModule({
    imports: [
        CommonModule,
        LifePulseRoutingModule,
        TabsComponent,
        RightTabsComponent,
        MeasurementsBarComponent


    ],
    declarations: [LifePulseComponent]
})
export class LifePulseModule { }
