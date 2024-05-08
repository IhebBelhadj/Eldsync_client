import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import introJs from 'intro.js';
import { MessageService } from 'primeng/api';
import { catchError, forkJoin, map, of } from 'rxjs';
import { EventStatus } from '../event/event-status';
import { EventService } from '../event/event.service';


@Component({
  selector: 'app-event-user',
  templateUrl: './event-user.component.html',
  styleUrl: './event-user.component.scss',
  providers: [MessageService]

})
export class EventUserComponent implements OnInit {

  events: any[] = [];
  selectedEvent: any = null;

  totalRecords: number = 0;
  rows: number = 6;  // Default number of rows per page
  page: number = 0;  // Default initial page
  displayDialog: boolean = false;
  fromDate: Date = new Date();  // Optionally initialize to today's date
  toDate: Date = new Date();    // Optionally initialize to today's date
  nextEvent: any;

  userId: number = 3;  

  filteredEvents: Event[] = [];
  categories: string[] = []; 
  selectedCategory: string = ''; 


  RegisterDialog: boolean = false;
  dialogMessage: string = '';
  //  private tour: Shepherd.Tour;


  constructor(private eventService: EventService, private router: Router,private messageService: MessageService) {}

  ngOnInit(): void {
    this.getEventsByStatus(); 
    this.loadNextEvent(); 


  }

  
  loadNextEvent(): void {
    this.eventService.getNextEvent().subscribe({
      next: (event) => {
        this.nextEvent = event;
        console.log('Next event:', this.nextEvent);
      },
      error: (error) => console.error('Failed to load the next event:', error)
    });
  }

  paginate(event: any): void {
    this.page = event.page;
    this.rows = event.rows;
    this.getEventsByStatus();  // Refetch or rearrange the events list according to new pagination
  }

  onCategoryChange(): void {
    if (this.selectedCategory) {
      this.filteredEvents = this.events.filter(event => event.category === this.selectedCategory);
    } else {
      this.filteredEvents = [...this.events];
    }
  }

  resetFilter(): void {
    this.selectedCategory = '';
    this.getEventsByStatus(); 
  }

  getEventsByStatus(): void { // Renamed method for clarity
    this.eventService.retrieveAllEvents().subscribe(events => {
      console.log("Fetched events:", events);

      const approvedEvents = events.filter(event => event.status === EventStatus.APPROVED);
      console.log("Filtered approved events:", approvedEvents);
      this.totalRecords = approvedEvents.length;  // Update total records for pagination
      this.handleEventBanners(approvedEvents.slice(this.page * this.rows, (this.page + 1) * this.rows));
       });
  }

  getEventsByDateRange(): void {
    if (!this.fromDate || !this.toDate || this.fromDate > this.toDate) {
      alert("Please check the dates. Start date should not be later than end date.");
      return;
    }

    const validFromDate = new Date(this.fromDate);
    const validToDate = new Date(this.toDate);

    this.eventService.getEventsByDonationDateRange(validFromDate, validToDate).subscribe(events => {
      const approvedEvents = events.filter(event => event.status === EventStatus.APPROVED);
      this.handleEventBanners(approvedEvents);
    }, error => {
      console.error('Error fetching events by date range:', error);
    });
  }



  
  handleEventBanners(approvedEvents: any[]): void {
    let observables = approvedEvents.map(event => 
      this.eventService.getEventBanner(event.idEvent).pipe(
        catchError(err => {
          console.log(`Error fetching banner for event ${event.idEvent}`, err);
          return of('assets/default-banner.jpg');
        }),
        map(bannerUrl => {
          event.bannerUrl = bannerUrl;
          return event;
        })
      )
    );

    forkJoin(observables).subscribe(completedEvents => {
      this.events = completedEvents;
      this.filteredEvents = completedEvents;
        this.categories = [...new Set(completedEvents.map(event => event.category))];
    });
  }

  GoAdd(): void {
    this.router.navigate(['/frontOffice/eventUser/eventUserAdd']);
  }

  showDialog(event: any): void {
    this.selectedEvent = event;
    this.displayDialog = true;
  }




  registerToEvent(eventId: number): void {
  
    this.eventService.registerUserForEvent(this.userId, eventId).subscribe({
      next: () => { 
        this.showDialoog('You have successfully registered for the event! You can check the list of events registred in "Attended"');
      },
      error: err => {
        console.error('Registration failed:', err);
        this.showDialoog('You have successfully registered for the event!');
      }
    });
  }
  

navigateToAttendedEvents(): void {
  this.router.navigate(['/frontOffice/eventUser/eventAttended']); // Adjust the path as needed
}








showToast() {
  this.messageService.add({
    key: 'confirm', 
    severity: 'info', 
    summary: 'Notification', 
    detail: 'Operation performed successfully'
  });
}

onReject() {
  this.messageService.clear('confirm');
}

showDialoog(message: string) {
  this.dialogMessage = message;
  this.RegisterDialog = true;
}

hideDialoog() {
  this.RegisterDialog = false;
}







  GoCalender(): void {
    this.router.navigate(['/frontOffice/eventUser/eventUserCalender']);
  }

  GoRecommandation(): void {
    this.router.navigate(['/frontOffice/eventUser/eventRecommandation']);
  }


  onConfirm(): void {
    this.router.navigate(['/frontOffice/eventUser/eventRecommandation']);
  }

  ngAfterViewInit(): void {
    this.startTour();
  }





  startTour() {
    const intro = introJs();

    intro.setOptions({
      steps: [
        
        {
          element: '#viewrButton',
          intro: 'This shows the name of the closest upcoming event. It’s the next event you might like to attend!',
          position: 'top'
        },
        {
          element: '#registerButton',
          intro: 'Here you can see the date when the event is happening. Mark your calendar!',
          position: 'top'
        },
        {
          element: '#searchButton',
          intro: 'Use this button to find events on specific dates. Just choose the dates you’re interested in and see what’s available.',
          position: 'top'
        },
        {
          element: '#suggestButton',
          intro: 'Not sure what to do? Click here for suggestions on fun events you might enjoy.',
          position: 'top'
        },
        {
          element: '#schedulerButton',
          intro: 'This is your calendar. It helps you see all scheduled events organized month by month',
          position: 'top'
        },
        {
          element: '#attendedButton',
          intro: 'View a list of all the events you have signed up for.',
          position: 'top'
        },
        {
          element: '#notificationsButton',
          intro: 'Check here often for notifications about exciting new events that match your interests!.',
          position: 'top'
        }
      ],
      exitOnOverlayClick: false,
      showBullets: false,
      showStepNumbers: false,
      nextLabel: 'Next',
      prevLabel: 'Back',
      skipLabel: 'Skip',
      doneLabel: 'Finish'
    });

    intro.start();
  }






  }
















