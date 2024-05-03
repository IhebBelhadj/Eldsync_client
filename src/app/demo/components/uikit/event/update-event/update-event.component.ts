  import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { EventService } from '../event.service';

  @Component({
    selector: 'app-update-event',
    templateUrl: './update-event.component.html',
    styleUrl: './update-event.component.scss'
  })
  export class UpdateEventComponent implements OnInit  {
    eventForm: FormGroup;
    status: SelectItem[] = [];
    categories: SelectItem[] = [];
    selectedFile: File = null;
    filteredLocations: string[] = [];
    imageUrl: any;
    @ViewChild('fileInput') fileInput: ElementRef;
    files: File[] = [];
    selectedLocation: string | null = null; // This will hold the selected location as a string
    suggestions: string[] = [];
  





    constructor(
      private eventService: EventService, 
      private router: Router,
      private fb: FormBuilder,    
      private route: ActivatedRoute

    ) {}


    ngOnInit(): void {
      this.initForm();
      this.loadCategories(); 
      this.loadStatus(); 

      
      const eventId = +this.route.snapshot.paramMap.get('idEvent');
      if (eventId) {
        this.eventService.getEventDetails(eventId).subscribe({
          next: (data) => {
            this.updateForm(data);
            this.loadEventBanner(eventId);

  
          },
          error: (error) => {
            console.error('Error fetching item', error);
          }
        });
      }
    }

    private loadCategories(): void {
      this.categories = [
          { label: 'Entertainment', value: 'ENTERTAINMENT' },
          { label: 'Outdoor Activities', value: 'OUTDOOR_ACTIVITIES' },
          { label: 'Health Checkup', value: 'HEALTH_CHECKUP' },
          { label: 'Social Gathering', value: 'SOCIAL_GATHERING' }
      ];
  }

  private loadStatus(): void {
      this.status = [
          { label: 'Approved', value: 'APPROVED' },
          { label: 'Pending', value: 'PENDING' }
      ];
  }

  
    
    private updateForm(event: any): void {
      console.log("Data received for event:", event);
      

      this.eventForm.patchValue({
        name:event.name ,
        description:event.description,
        date: new Date(event.date), 
        category:event.category,
        location:event.location,
        price:event.price,
        status:event.status,
        bannerData:event.bannerData,

      });
      
      console.log("Category on form:", this.eventForm.get('category').value);
      console.log("Status on form:", this.eventForm.get('status').value);
    }

    initForm(): void {
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
    private loadEventBanner(eventId: number): void {
      this.eventService.getEventBanner(eventId).subscribe(imageUrl => {
        this.imageUrl = imageUrl;
      });
    }

    
    onSubmit(): void {
      if (this.eventForm.valid) {
        const idEvent = +this.route.snapshot.paramMap.get('idEvent');
        console.log('Submitting with form values:', this.eventForm.value);
    console.log('And selected file:', this.selectedFile);
        this.eventService.updateEvent(idEvent, this.eventForm.value, this.selectedFile).subscribe({
          next: () => {
            console.log('Event updated successfully');
            this.router.navigate(['/uikit/event']);
            console.log(this.imageUrl);
            
          },
          error: error => console.error('Error updating event', error)
        });
      }
    }


    removeFile(file: any): void {
      this.selectedFile = null;
    }
    
    handleFileSelect(event: any): void {
      if (event.files && event.files.length > 0) {
        this.selectedFile = event.files[0];
        console.log('Selected file:', this.selectedFile.name);
        
       /* 
        const reader = new FileReader();
        reader.onload = (e: any) => this.imageUrl = e.target.result;
        reader.readAsDataURL(this.selectedFile);
        */
      }
    }
    
 /*
    handleFileButtonClick(): void {
      this.fileInput.nativeElement.click();
    }

    handleFileInput(files: FileList): void {
      this.selectedFile = files.item(0); // Assumes single file upload, adjust as needed.
      if (this.selectedFile) {
        console.log('Selected file:', this.selectedFile.name);  // Logging the file name
      }
    }
    
    
   onSubmit(): void {
      if (this.eventForm.valid) {
        const idEvent = this.route.snapshot.params['idEvent'];
        if (idEvent) {
          this.eventService.updateEvent(idEvent, this.eventForm.value).subscribe({
            next: () => {
              console.log('Event updated successfully');
              this.router.navigate(['/uikit/event']);
            },
            error: error => console.error('Error updating event', error)
          });
        } else {
          console.error('No ID provided for event update.');
        }
      }
    }
    
*/
searchLocations(event): void {
  this.eventService.getLocationSuggestions(event.query).subscribe(data => {
    console.log("Filtered Locations:", data); // Check the output here
    this.filteredLocations = data;
  });
}
 

    goBack(): void {
      this.router.navigate(['/uikit/event']);
    }



   
  




  }
