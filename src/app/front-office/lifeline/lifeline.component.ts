import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HudComponent } from './hud/hud.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AmbientBackgroundComponent } from './components/ambient-background/ambient-background.component';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';

@Component({
    selector: 'app-lifeline',
    standalone: true,
    imports: [HudComponent, CalendarComponent, AmbientBackgroundComponent, ConfirmPopupComponent],
    templateUrl: './lifeline.component.html',
    styleUrl: './lifeline.component.scss'
})
export class LifelineComponent implements OnInit {

    constructor(
        private layoutService: LayoutService,
    ) {
        console.log(this.layoutService)
    }

    ngOnInit() {
        // this.getDotById('10', `
        //     idDot
        //     elderId
        //     eventDate
        //     dotMarkdown
        //     emotionType
        //     emotionIntensity
        // `);
    }

    getDotById(dotId: string, queryString: string) {
        // this.dotService.getDotById(dotId, queryString).subscribe((dot) => {
        //     console.log(dot);
        // });
    }
}
