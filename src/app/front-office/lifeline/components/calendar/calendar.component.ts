import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DotService } from '../../services/dot.service';
import { Dot } from '../../models/dot';
import { map, Subscription } from 'rxjs';
import { LifelineStateService } from '../../state/lifeline-state.service';
import moment from 'moment';
import { DotInspectComponent } from '../dot-inspect/dot-inspect.component';

@Component({
    selector: 'lifeline-calendar',
    standalone: true,
    imports: [FullCalendarModule, CommonModule, ButtonModule, DotInspectComponent],
    providers: [DatePipe],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements AfterViewInit, OnDestroy {

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

    stateSubscription!: Subscription;

    dotEvent: Event;
    dotSelector: ElementRef;

    constructor(
        private crd: ChangeDetectorRef,
        private dotService: DotService,
        private datePipe: DatePipe,
        private lifelineState: LifelineStateService,
    ) { };

    ngAfterViewInit() {
        this.stateSubscription = this.lifelineState.calendarCurrentDate$
            .subscribe((date: Date) => {
                this.calendarApi.gotoDate(date);
                console.log("updated calendar")
                this.calendarUpdate();
            });
    }

    ngOnDestroy(): void {
        if (this.stateSubscription)
            this.stateSubscription.unsubscribe();
    }

    seekLeft() {
        const prevDate = moment(this.lifelineState.calendarCurrentDateSnapshot).subtract(1, 'months').toDate();
        this.lifelineState.setCalendarCurrentDate(prevDate);
        this.calendarUpdate();
    }

    seekRight() {
        const nextDate = moment(this.lifelineState.calendarCurrentDateSnapshot).add(1, 'months').toDate();
        this.lifelineState.setCalendarCurrentDate(nextDate);
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


        this.dotService.searchDots({ elderId: 1, startDate: startDateString, endDate: endDateString }, `
            idDot
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
                    date: new Date(dot.eventDate),
                    background: "#FF0"
                }));
            })
        )
            .subscribe((data: Dot[]) => {
                this.events = data;
                console.log('data:', data);
            });
    }

    onEventHover(hoverState: boolean, selector: ElementRef, event: Event, dot: Dot) {

        if (!hoverState) {
            this.lifelineState.setDotInspect(false);
            return;
        }

        console.log("before", this.lifelineState.snapshot.dotInspectOpen);

        this.lifelineState.setDotInspectData(event, selector, dot);
        this.lifelineState.setDotInspect(true);
        console.log("after", this.lifelineState.snapshot.dotInspectOpen)

    }


}
