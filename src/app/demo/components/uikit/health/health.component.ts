import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrl: './health.component.scss'
})
export class HealthComponent implements OnInit {
    routeItems: MenuItem[] = [];


    constructor() {

    }

    ngOnInit() {



        this.routeItems = [
            {label: 'Health Track', routerLink: 'healthTrack'},
            {label: 'Vital Signes', routerLink: 'vitalSignes'},
            {label: 'Health Metric', routerLink: 'healthMetric'},
            {label: 'Notes', routerLink: 'notes'},
        ];


    }

}