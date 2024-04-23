import { Component } from '@angular/core';
import { Medication } from './model/medication';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';

import { ConsumerMedicationService } from './services/consumer-medication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrl: './medication.component.scss'
})
export class MedicationComponent {
  medicationList: Medication[] = [];
  searchTerm: string = '';
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };

  constructor(private consMedService: ConsumerMedicationService,private router: Router) { }

  ngOnInit(): void {
    this.loadMedications();
  }

  
  goToAddMedicationForm(): void {
    this.router.navigate(['/uikit/medication/add']);
  }
  goToUpdateMedicationForm(id: number): void {
    this.router.navigate(['/uikit/medication/update', id]);
  }
  


  loadMedications(): void {
    this.consMedService.getMedications().subscribe({
      next: (data: Medication[]) => { 
        this.medicationList = data;
      },
      error: (error) => {
        console.error('Error loading medications:', error);
      }
    });
  }

  deleteMedication(id: number): void {
    this.consMedService.deleteMedication(id).subscribe(() => {
      this.loadMedications();
    });
  }
  get filteredMedications(): Medication[] {
    return this.medicationList.filter(medication =>
      medication.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

  }
  displayDialog: boolean = false;
  selectedMedication: Medication;

  showDialog(medication: Medication) {
    this.selectedMedication = medication;
    this.displayDialog = true;
  }

  hideDialog() {
    this.selectedMedication = null;
    this.displayDialog = false;
  }
}
