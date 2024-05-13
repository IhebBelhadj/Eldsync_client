import { Time } from "@angular/common";
import { MedicationForm } from "./MedicationForm";
import { MedicationFrequency } from "./MedicationFrequency";
import { MedicationInstruction } from "./MedicationInstruction";

export class Medication {
id!:number;
name!: string;
dosage!: string;
form!:MedicationForm;
frequency!: MedicationFrequency; 
startDate!: Date;
endDate!: Date;
purpose!: string; 
dosageTime!:Time;
instructions!:MedicationInstruction;
 }