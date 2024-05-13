import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsumerMedicationService } from '../services/consumer-medication.service';
import { MedicationForm } from '../model/MedicationForm';
import { MedicationFrequency } from '../model/MedicationFrequency';
import { MedicationInstruction } from '../model/MedicationInstruction';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.css']
})
export class AddMedicationComponent{
  medicationForm: FormGroup;
  medicationForms: { label: string, value: any }[];
  medicationFrequencies: { label: string, value: any }[];
  medicationInstructions: { label: string, value: any }[];

  constructor(private fb: FormBuilder, private conMedService: ConsumerMedicationService, private router: Router) {
    this.medicationForms = Object.values(MedicationForm).map(form => ({ label: form, value: form }));
    this.medicationFrequencies = Object.values(MedicationFrequency).map(frequency => ({ label: frequency, value: frequency }));
    this.medicationInstructions = Object.values(MedicationInstruction).map(instruction => ({ label: instruction, value: instruction }));

    this.medicationForm = this.fb.group({
      name: ['', Validators.required],
      dosage: ['', Validators.required],
      frequency: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      instructions: [''],
      purpose: ['', Validators.required],
      dosageTime: ['', Validators.required],
      form: ['', Validators.required],
    });
  }

  save() {
    if (this.medicationForm.valid) {
      this.conMedService.addMedication(this.medicationForm.value).subscribe(
        () => {
          console.log('Medication successfully saved');
          this.router.navigateByUrl('/uikit/medication');
        },
        (error) => {
          console.error('Error occurred while saving medication:', error);
          // Handle the error here, e.g., display a message to the user
        }
      );
    } else {
      console.error('Form validation failed. Please fill all required fields correctly.');
    }
  }
}
