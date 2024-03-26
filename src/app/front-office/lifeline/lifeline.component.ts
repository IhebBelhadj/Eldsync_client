import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { GraphDisplayComponent } from './graph-display/graph-display.component';
import { HudComponent } from './hud/hud.component';
import { DotService } from './services/dot.service';

@Component({
    selector: 'app-lifeline',
    standalone: true,
    imports: [GraphDisplayComponent, HudComponent],
    templateUrl: './lifeline.component.html',
    styleUrl: './lifeline.component.scss'
})
export class LifelineComponent implements OnInit {

    constructor(
        private layoutService: LayoutService,
        private dotService: DotService,
    ) {
        console.log(this.layoutService)
    }

    ngOnInit() {
        this.getDotById('10', `
            idDot
            elderId
            eventDate
            dotMarkdown
            emotionType
            emotionIntensity
        `);
    }

    getDotById(dotId: string, queryString: string) {
        this.dotService.getDotById(dotId, queryString).subscribe((dot) => {
            console.log(dot);
        });
    }
}
