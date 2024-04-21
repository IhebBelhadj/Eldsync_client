import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DotService } from '../../services/dot.service';
import { Dot } from '../../models/dot';
import { map } from 'rxjs';

@Component({
    selector: 'lifeline-calendar',
    standalone: true,
    imports: [FullCalendarModule, CommonModule, ButtonModule],
    providers: [DatePipe],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

    @ViewChild('calendar') calendar: FullCalendarComponent;

    calendarTitle = {
        year: '',
        month: ''
    };

    events: Dot[] = [];

    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        height: screen.height * 0.6,
        headerToolbar: false,
        viewDidMount: this.viewDidMount.bind(this),
        fixedWeekCount: false,
        events: this.events,

    };

    constructor(
        private crd: ChangeDetectorRef,
        private dotService: DotService,
        private datePipe: DatePipe,
    ) { };

    seekLeft() {
        this.calendarApi.prev();
        this.calendarUpdate();
    }

    seekRight() {
        this.calendarApi.next();
        this.calendarUpdate();
    }

    updateCalendarTitle() {
        const currentDate = this.calendarApi.getDate();
        this.calendarTitle.year = currentDate.getFullYear().toString();
        this.calendarTitle.month = currentDate.toLocaleString('default', { month: 'long' });
    }

    viewDidMount() {
        console.log('viewDidMount');
        this.calendarUpdate();
    }

    get calendarApi() {
        return this.calendar.getApi();
    }

    calendarUpdate() {
        this.updateCalendarTitle();
        this.crd.detectChanges();
        const startDate = this.calendarApi.view.currentStart;
        const endDate = this.calendarApi.view.currentEnd;

        const startDateString = this.datePipe.transform(startDate, 'yyyy-MM-ddTHH:mm:ss');
        const endDateString = this.datePipe.transform(endDate, 'yyyy-MM-ddTHH:mm:ss');
        console.log('startDate:', startDate);
        console.log('endDate:', endDate);

        this.dotService.searchDots({ elderId: 1, startDate: startDateString, endDate: endDateString }, `
            idDot
            elderId
            eventDate
            dotMarkdown
            emotionType
            emotionIntensity
        `).pipe(
            map((data: Dot[]) => {
                // Transform eventDate to date format
                return data.map(dot => ({
                    ...dot,
                    eventDate: new Date(dot.eventDate),
                    date: new Date(dot.eventDate)
                }));
            })
        )
            .subscribe((data: Dot[]) => {
                this.events = data;
                console.log('data:', data);
            });
    }


}
