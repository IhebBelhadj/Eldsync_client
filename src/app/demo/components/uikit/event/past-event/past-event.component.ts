import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Event } from '../event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-past-event',
  templateUrl: './past-event.component.html',
  styleUrls: ['./past-event.component.scss']
})
export class PastEventComponent implements OnInit {
  pastEvents: Event[] = [];

  constructor(private eventService: EventService, private router: Router,) {}

  ngOnInit(): void {
    this.getEvents();
  }




  getEvents(): void {
    this.eventService.getPastEvents().subscribe(events => {
      let observables = events.map(event => 
        this.eventService.getEventBanner(event.idEvent).pipe(
          catchError(err => {
            console.log(`Error fetching banner for event ${event.idEvent}`, err);
            return of('assets/default-banner.jpg'); // Provide a default or error image path
          })
        ).pipe(
          map(bannerUrl => {
            event.bannerUrl = bannerUrl;
            return event;
          })
        )
      );
      forkJoin(observables).subscribe(completedEvents => {
        this.pastEvents = completedEvents;
      });
    });
  }

  GoHome(): void {
    this.router.navigate(['/uikit/event']);
  }
}
