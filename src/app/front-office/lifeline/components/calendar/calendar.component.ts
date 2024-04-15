import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'lifeline-calendar',
    standalone: true,
    imports: [FullCalendarModule, CommonModule, ButtonModule],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

    @ViewChild('calendar') calendar: FullCalendarComponent;

    calendarTitle = {
        year: '',
        month: ''
    };

    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        height: screen.height * 0.7,
        headerToolbar: false,
        viewDidMount: this.viewDidMount.bind(this),
    };

    constructor(private crd: ChangeDetectorRef) { };

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

    }
}
