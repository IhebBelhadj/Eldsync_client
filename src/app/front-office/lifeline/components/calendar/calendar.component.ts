import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DotService } from '../../services/dot.service';
import { Dot } from '../../models/dot';
import { map, Observable, Subscription } from 'rxjs';
import { DotCreationCancelState, LifelineStateService } from '../../state/lifeline-state.service';
import moment from 'moment';
import { DotInspectComponent } from '../dot-inspect/dot-inspect.component';
import { EmotionRates, LifelineDataService } from '../../state/lifeline-data.service';
import { Knob, KnobModule } from 'primeng/knob';
import { EmotionType } from '../../models/emotionType';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lifeline-calendar',
  standalone: true,
  imports: [FormsModule, CommonModule, FullCalendarModule, CommonModule, ButtonModule, DotInspectComponent, KnobModule],
  providers: [DatePipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements AfterViewInit, OnDestroy {

  @ViewChild('calendar') calendar: FullCalendarComponent;


  @ViewChild('happyRateKnob') happyRateKnob: Knob;
  @ViewChild('sadRateKnob') sadRateKnob: Knob;
  @ViewChild('angryRateKnob') angryRateKnob: Knob;
  @ViewChild('gratefulRateKnob') gratefulRateKnob: Knob;
  @ViewChild('lovingRateKnob') lovingRateKnob: Knob;

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

  stats = {
    happyRate: 30,
    sadRate: 0,
    angryRate: 0,
    gratefulRate: 0,
    lovingRate: 0,
  }

  stateSubscription!: Subscription;

  dotEvent: Event;
  dotSelector: ElementRef;

  emotionRates$: Observable<EmotionRates>;

  constructor(
    private crd: ChangeDetectorRef,
    private dotService: DotService,
    private datePipe: DatePipe,
    private lifelineState: LifelineStateService,
    private lifelineData: LifelineDataService,
  ) { };

  ngAfterViewInit() {
    this.stateSubscription = this.lifelineState.calendarCurrentDate$
      .subscribe((date: Date) => {
        this.calendarApi.gotoDate(date);
        console.log("updated calendar")
        this.calendarUpdate();
      });

    this.emotionRates$ = this.lifelineData.emotionRates$;
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

        // calculate stats
        const emotionRates = {
          happy: 0,
          sad: 0,
          loving: 0,
          grateful: 0,
          angry: 0
        };

        // Calculate total dots for normalization
        let totalDots = 0;

        data.forEach(dot => {
          totalDots += dot.emotionIntensity;
          switch (dot.emotionType) {
            case EmotionType.HAPPY:
              emotionRates.happy += dot.emotionIntensity;
              break;
            case EmotionType.SAD:
              emotionRates.sad += dot.emotionIntensity;
              break;
            case EmotionType.LOVING:
              emotionRates.loving += dot.emotionIntensity;
              break;
            case EmotionType.GRATEFUL:
              emotionRates.grateful += dot.emotionIntensity;
              break;
            case EmotionType.ANGRY:
              emotionRates.angry += dot.emotionIntensity;
              break;

          }
        });

        Object.keys(emotionRates).forEach(emotion => {
          emotionRates[emotion] /= totalDots;
          emotionRates[emotion] *= 100;
        });

        this.lifelineData.updateEmotionRates(emotionRates);

        console.log(this.lifelineData.snapshot.emotionRates);

        this.crd.detectChanges();

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

    this.crd.detectChanges();

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


  showDotDetails(dot: Dot) {
    console.log("show details");
    this.lifelineState.setDotInspectData(null, null, dot);
    const snapshot = this.lifelineState.snapshot;
    const isCreatingDot = snapshot.rightPanelAction == "add" && snapshot.rightPanelOpen;
    console.log("isCreatingDot", isCreatingDot);
    if (isCreatingDot) {
      this.lifelineState.initCancelDotCreationRequest$().subscribe(value => {
        if (value != DotCreationCancelState.VALIDATED) return;
        this.showRightPanelDotDetails(dot);
      });
    } else {
      this.showRightPanelDotDetails(dot);
    }

  }

  showRightPanelDotDetails(dot: Dot) {
    this.lifelineState.setRightPanelAction('show');
    this.lifelineState.setRightPanel(true);
    this.lifelineData.setSelectedDotId(dot.idDot);
  }

  getEmotionSaturation(emotionRate: number) {
    const scaledSaturation = 0.2 + (emotionRate / 100) * 2;
    return scaledSaturation;
  }


}
