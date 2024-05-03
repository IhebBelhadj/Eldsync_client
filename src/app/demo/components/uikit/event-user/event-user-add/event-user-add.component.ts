import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { EventService } from '../../event/event.service';

@Component({
  selector: 'app-event-user-add',
  templateUrl: './event-user-add.component.html',
  styleUrl: './event-user-add.component.scss'
})
export class EventUserAddComponent  implements OnInit {
  
  eventForm: FormGroup;
  status: SelectItem[] = [];
  categories: SelectItem[] = [];
  selectedDrop: SelectItem = { value: '' };
  filteredLocations: any[] = [];
  selectedLocation: string | null = null; // This will hold the selected location as a string
  fileData: File | null = null;
  suggestions: string[] = [];
  displayDialog: boolean = false;

  imgURL:any;
  userFile:any;
  public imagePath:any;
  public message!: string;
    // Using ViewChild to access the file input in the template
    @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;



  constructor(private formBuilder: FormBuilder, private eventService: EventService, private router: Router) {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      banner: [''],
      date: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.status = [
      { label: 'Approved', value: 'APPROVED' },
      { label: 'Pending', value: 'PENDING' }

    ];
    this.categories = [
      { label: 'ENTERTAINMENT', value: 'ENTERTAINMENT' },
      { label: 'OUTDOOR_ACTIVITIES', value: 'OUTDOOR_ACTIVITIES' },
      { label: 'HEALTH_CHECKUP', value: 'HEALTH_CHECKUP' },
      { label: 'SOCIAL_GATHERING', value: 'SOCIAL_GATHERING' }
    ];
  }

  onCategoryChange(value: any): void {
    this.eventForm.get('category').setValue(value);
  }

  
  search(event) {
    this.eventService.getLocationSuggestions(event.query).subscribe(data => {
      console.log("Search results:", data);
      this.suggestions = data;
    }, error => {
      console.error('Failed to fetch location suggestions', error);
    });
  }
  
  onLocationSelect(event: any): void {
    console.log("Location selected:", event);
    this.selectedLocation = event;  // Update this according to the data structure you are using
    this.eventForm.get('location').setValue(event.value);
    console.log(event.value); // This should show you what's actually being selected

  }
  

  onStatusChange(status: any): void {
    this.eventForm.get('status').setValue(status.id);
  }

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    const fileNameContainer = document.getElementById('file-name');
    if (input.files && input.files.length > 0) {
        this.fileData = input.files[0];
        fileNameContainer.textContent = input.files[0].name;  // Update the file name display
    } else {
        fileNameContainer.textContent = 'No file chosen';  // Reset the display if no file is selected
    }
}



  
  
  onSubmit(data: any): void {
    console.log("Form data:", data);  // Add this line to log form data

    const file = this.fileInput && this.fileInput.nativeElement.files.length > 0 ? this.fileInput.nativeElement.files[0] : null;

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('date', data.date.toISOString().split('T')[0]); // Ensure the date is formatted properly
    formData.append('category', data.category);
    formData.append('location', data.location);
    formData.append('price', data.price.toString());
    formData.append('status', 'PENDING');

    this.eventService.addEvent(formData).subscribe({
      next: (response) => {
        console.log('Event created successfully!', response);
        this.displayDialog = true;  // Show the dialog
      },
      error: (error) => console.error('Error creating event:', error)
    });
  }



  onDialogHide(): void {
    this.displayDialog = false;
    this.router.navigate(['/uikit/eventUser']);
  }

  goBack(): void {
    this.router.navigate(['/uikit/eventUser']);
  }
}


