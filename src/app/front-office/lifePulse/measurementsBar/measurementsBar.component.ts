import {Component, OnInit} from '@angular/core';
import {TabMenuModule} from "primeng/tabmenu";
import {MenuItem} from "primeng/api";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-measurements',
  standalone: true,
    imports: [
        RouterLink,
        TabMenuModule
    ],
  templateUrl: './measurementsBar.component.html',
  styleUrl: './measurementsBar.component.scss'
})
export class MeasurementsBarComponent {
    routeItems: MenuItem[];

    constructor() {
        this.routeItems = [
            { label: 'Life Vital', routerLink: 'lifeVital' },
            { label: 'Life Metric', routerLink: 'lifeMetric' },
        ];


    }
}
