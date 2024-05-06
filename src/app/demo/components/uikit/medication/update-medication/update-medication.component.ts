import { Component } from '@angular/core';
import { Medication } from '../model/medication';
import { ConsumerMedicationService } from '../services/consumer-medication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { MedicationFrequency } from '../model/MedicationFrequency';
import { MedicationInstruction } from '../model/MedicationInstruction';
import { MedicationForm } from '../model/MedicationForm';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update-medication',
  templateUrl: './update-medication.component.html',
  styleUrls: ['./update-medication.component.css']
})
export class UpdateMedicationComponent {
  medicationId: number;
  medication: Medication;
  medicationForm: FormGroup;
  medicationForms: string[] = Object.values(MedicationForm);
  medicationFrequencies: string[] = Object.values(MedicationFrequency);
  medicationInstructions: string[] = Object.values(MedicationInstruction);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conMedService: ConsumerMedicationService
  ) { }

  ngOnInit(): void {
    this.medicationId = this.route.snapshot.params['id'];
    this.getMedication(this.medicationId);
    this.medicationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      dosage: new FormControl('', Validators.required),
      frequency: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      instructions: new FormControl(''),
      purpose: new FormControl('', Validators.required),
      dosageTime:new FormControl('', Validators.required),
      form: new FormControl('', Validators.required),
    });
  }

  getMedication(id: number): void {
    this.conMedService.getMedicationById(id).subscribe(
      (medication: Medication) => {
        this.medication = medication;
        this.medicationForm.patchValue({
          name: medication.name,
          dosage: medication.dosage,
          frequency: medication.frequency,
          startDate: medication.startDate,
          endDate: medication.endDate,
          instructions: medication.instructions,
          purpose: medication.purpose,
          dosageTime: medication.dosageTime,
          form: medication.form,
        });
      },
      (error) => {
        console.error('Error occurred while fetching medication:', error);
      }
    );
  }
  update(): void {
    if (this.medicationForm.valid) {
      const updatedMedication: Medication = this.medicationForm.value as Medication;
      updatedMedication.id = this.medicationId;
      this.conMedService.updateMedication(updatedMedication, this.medicationId).subscribe(
        () => {
          console.log('Medication successfully updated');
          this.router.navigateByUrl('/uikit/medication');
        },
        (error) => {
          console.error('Error occurred while updating medication:', error);
          // Handle the error here, e.g., display a message to the user
        }
      );
    } else {
      // Display an error message to the user indicating that the form is invalid
      console.error('Form validation failed. Please fill all required fields correctly.');
    }
  }
  
}
