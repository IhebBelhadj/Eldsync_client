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
  selectedDate: Date | null = null;
  editingEventId: number | null = null;
  showDialog = false;



  constructor(private eventService: EventService, private router: Router) {}

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


  openReschedule(event: Event): void {
    this.editingEventId = event.idEvent;
    this.selectedDate = new Date(event.date); // assuming `date` is in a compatible format
    this.showDialog = true;
  }

  
  rescheduleEvent(): void {
    if (this.editingEventId && this.selectedDate) {
      // Convert the selected date to UTC
      const formattedDate = new Date(Date.UTC(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth(),
        this.selectedDate.getDate()
      )).toISOString().split('T')[0];  // Ensure the date is in 'yyyy-MM-dd' format
      
      this.eventService.rescheduleEvent(this.editingEventId, formattedDate).subscribe({
        next: (updatedEvent) => {
          this.getEvents(); // Refresh the events list or update locally
          this.editingEventId = null; // Reset editing
          this.selectedDate = null; // Reset the selected date
          this.showDialog = false; // Hide the dialog on completion
        },
        error: (error) => {
          console.error('Failed to reschedule event', error);
        }
      });
    }
  }
  






















  GoHome(): void {
    this.router.navigate(['/frontOffice/event']);
  }
}
