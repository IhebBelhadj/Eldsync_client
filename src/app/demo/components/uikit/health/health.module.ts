import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthRoutingModule} from "./health-routing.module";
import { HealthComponent} from "./health.component";
import {StepsModule} from "primeng/steps";
import {TabMenuModule} from "primeng/tabmenu";
import {InputTextModule} from "primeng/inputtext";
import {MenubarModule} from "primeng/menubar";


@NgModule({
    imports: [
        CommonModule,
        HealthRoutingModule,
        StepsModule,
        TabMenuModule,
        InputTextModule,
        MenubarModule


    ],
    declarations: [HealthComponent]
})
export class HealthModule { }