import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Observable } from 'rxjs';
import { EventService } from '../../event/event.service';
@Component({
  selector: 'app-event-user-calender',
  templateUrl: './event-user-calender.component.html',
  styleUrl: './event-user-calender.component.scss'
})
export class EventUserCalenderComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarOptions: any;
  eventForm: FormGroup;
  selectedEvent: any;
  events: any[] = [];
  currentEvents: EventApi[] = [];
  editing: boolean = false;
  categories = [];  // Populate categories appropriately
  statues = [];    
  displayDetailsDialog: boolean = false;
  displayEditDialog: boolean = false;
  displayAddDialog: boolean = false;
  fileData: File | null = null;
  selectedLocation: string | null = null; // This will hold the selected location as a string
  filteredLocations: string[] = [];


  selectedFile: File;
  eventBannerUrl: Observable<SafeUrl>;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;



  constructor(private eventService: EventService, private router: Router,private cdr: ChangeDetectorRef,private fb: FormBuilder) {
    this.createForm(); }

  createForm() {
    this.eventForm = this.fb.group({
      name: [''],
      description: [''],
      date:[null] ,
      category:[''],
      location: [''],
      price:[null],
      status:[''],
      bannerData:[null]
    });
  }



  private loadCategories(): void 
        {
            this.categories = [
                { label: 'Entertainment', value: 'ENTERTAINMENT' },
                { label: 'Outdoor Activities', value: 'OUTDOOR_ACTIVITIES' },
                { label: 'Health Checkup', value: 'HEALTH_CHECKUP' },
                { label: 'Social Gathering', value: 'SOCIAL_GATHERING' }
                            ];
        }



private loadStatus(): void 
        {
          this.statues = [
              { label: 'Approved', value: 'APPROVED' },
              { label: 'Pending', value: 'PENDING' }
                        ];
        }



  ngOnInit() 
        {
          this.loadEvents();
          this.loadStatus();
          this.loadCategories();
        }



  getEventBanner(eventId: number): void 
        {
          this.eventBannerUrl = this.eventService.getEventBanner(eventId);
        }
  



  loadEvents(): void 
      {
        this.eventService.retrieveAllEvents().subscribe(events => {
          this.events = events
          .filter(event => 
            event.status === 'APPROVED' && 
            new Date(event.date) >= new Date(new Date().setHours(0, 0, 0, 0)) // Compare date, ignoring time
          )
          .map(event => ({
            idEvent: event.idEvent, 
            title: event.name,
            start: new Date(event.date),
            description: event.description,
            category: event.category,
            location: event.location,
            price: event.price,
            bannerUrl: event.bannerData,
          }));
          console.log('Events for FullCalendar:', this.events); // Check the date here


          this.calendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            events: this.events,
            eventClick: this.handleEventClick.bind(this),
            dateClick: this.handleDateClick.bind(this),  // Add this line
            headerToolbar: {
              right: 'prev,next today',
              left: 'title',
//             center: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            eventContent: this.formatEventContent.bind(this)
          };
        });
      }



      handleDateClick(arg) {
        this.eventForm.reset();
        this.eventForm.patchValue({
          date: arg.dateStr 
        });
        this.displayAddDialog = true;
        this.cdr.detectChanges();
      
        console.log('date click! ', arg.dateStr);
      }
      



      formatEventContent({ event }) {
        let dotColor = new Date(event.start) >= new Date() ? 'green' : 'transparent';
        let timeString = new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        return {
          html: `<div class="event-content">
                   <div class="event-title">${event.title}</div>
                   <div class="event-time"><span class="time-dot" style="background-color: ${dotColor};"></span>${timeString}</div>
                 </div>`
        };
      }
      

  handleEventClick({ event }): void 
      {
        console.log('Clicked Event object:', event);
        this.selectedEvent = 
            {
                ...event.extendedProps, 
                title: event.title,
                date: event.start.toISOString(),
                startTime: event.start.toISOString(),
                description: event.extendedProps.description || 'No description provided.',
             };

        console.log('Selected Event Details:',
            {
              Title: this.selectedEvent.title,
              Date: this.selectedEvent.date,
              StartTime: this.selectedEvent.startTime,
              Description: this.selectedEvent.description,
              Location: this.selectedEvent.location,
              Status: this.selectedEvent.status,
              Price: this.selectedEvent.price,
              Category: this.selectedEvent.category
            });

    if (event.extendedProps && event.extendedProps.idEvent) 
      {
          this.fetchEventBanner(event.extendedProps.idEvent); // Ensure using the correct ID
      } 
    else 
      {
          console.error('No idEvent found in event extendedProps', event);
          this.selectedEvent.bannerUrl = 'assets/default-banner.jpg';
          console.log('Default banner URL used due to missing idEvent:', this.selectedEvent.bannerUrl);
      }
        this.displayDetailsDialog = true;
        this.cdr.detectChanges();  
  }



openEditDialog(event: any): void 
  {
    console.log('Opening Edit Dialog for Event:', event);
    this.displayDetailsDialog = false;
    console.log('Event Status:', event.status);  // Ensure this value is correct

    this.eventForm.patchValue
        ({
            name: event.title || '',
            description: event.description || '',
            date: new Date(event.date), 
            location: event.location || '',
            price: event.price || 0,
            category: event.category || null,
            status:event.status,
            bannerData: event.bannerData || null // Safely ignored if undefined
        });
    this.displayEditDialog = true;
    this.cdr.detectChanges();
  }



  closeEditDialog(): void 
    {
        console.log('Closing Edit Dialog');
        this.displayEditDialog = false;
        this.displayDetailsDialog = false; // Consider what behavior you want here
        this.cdr.detectChanges();  // Force Angular to check for changes
    }



  onCancel(): void 
    {
      console.log('Edit Canceled');
      this.closeEditDialog();
    }




onFileSelected(event: any) 
    {
        if (event.target.files && event.target.files.length > 0) 
            {
              this.selectedFile = event.target.files[0];
            }
    }





  
  fetchEventBanner(eventId: number) 
      {
        console.log(`Fetching banner for event ID: ${eventId}`);
        this.eventService.getEventBanner(eventId).subscribe(
          bannerUrl => {
                          this.selectedEvent.bannerUrl = bannerUrl; // Set the fetched banner URL
                          console.log('Banner URL fetched:', bannerUrl); // Log the fetched banner URL
                       },
          error => {
                      console.error('Failed to fetch banner:', error);
                      this.selectedEvent.bannerUrl = 'assets/default-banner.jpg'; // Set a default image in case of error
                      console.log('Default banner URL used:', this.selectedEvent.bannerUrl); // Log the default banner URL used
                   }
        );
      }


  

  GoBack(): void 
    {
      this.router.navigate(['/frontOffice/eventUser']);
    }


  toLocalISOString(date: Date): string 
    {
      const off = date.getTimezoneOffset();
      const adjustedDate = new Date(date.getTime() - (off * 60 * 1000));
      return adjustedDate.toISOString().slice(0, -1);
    }

  onSave() {
    if (this.eventForm.valid) {
      console.log('Form Data:', this.eventForm.value);

      // Use the utility function to adjust the date to local time zone
      const localISODate = this.eventForm.value.date ? this.toLocalISOString(this.eventForm.value.date) : null;

      const event = {
        ...this.eventForm.value,
        date: localISODate, // Use the locally adjusted ISO string
        status: 'PENDING' // Reset status to 'PENDING' on every update

      };

      if (this.selectedEvent && this.selectedEvent.idEvent) {

        this.eventService.updateEvent(this.selectedEvent.idEvent, event, this.selectedFile).subscribe({
          next: () => {
            console.log('Event updated successfully');
            this.closeEditDialog();
            this.loadEvents(); // Refresh the list of events
          },
          error: error => {
            console.error('Error updating event:', error);
          }
        });
      } else {
        console.error('No event ID provided for update');
      }
    } else {
      console.log('Form is not valid!');
    }
  }


  onAddEvent(data: any): void {
      const file = this.fileInput && this.fileInput.nativeElement.files.length > 0 ? this.fileInput.nativeElement.files[0] : null;

      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('date', data.date); 
      formData.append('category', data.category);
      formData.append('location', data.location);
      formData.append('price', data.price.toString());
      formData.append('status', 'PENDING');
  
      this.eventService.addEvent(formData).subscribe({
        next: (response) => console.log('Event created successfully!', response),
        error: (error) => console.error('Error creating event:', error)
      });
      this.displayAddDialog=false;
    }
  

    onFileSelection(event: any): void {
      const input = event.target as HTMLInputElement;
      const fileNameContainer = document.getElementById('file-name');
      if (input.files && input.files.length > 0) {
          this.fileData = input.files[0];
          fileNameContainer.textContent = input.files[0].name;  // Update the file name display
      } else {
          fileNameContainer.textContent = 'No file chosen';  // Reset the display if no file is selected
      }
  }


  searchLocations(event): void {
    this.eventService.getLocationSuggestions(event.query).subscribe(data => {
      console.log("Filtered Locations:", data); // Check the output here
      this.filteredLocations = data;
    });
  }
  
}

