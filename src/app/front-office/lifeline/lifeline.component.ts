import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { GraphDisplayComponent } from './graph-display/graph-display.component';

@Component({
    selector: 'app-lifeline',
    standalone: true,
    imports: [GraphDisplayComponent],
    templateUrl: './lifeline.component.html',
    styleUrl: './lifeline.component.scss'
})
export class LifelineComponent implements OnInit {

    constructor(public layoutService: LayoutService) {
        console.log(this.layoutService)
    }

    ngOnInit() {

    }
}
