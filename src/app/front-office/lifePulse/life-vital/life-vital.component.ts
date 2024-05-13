import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {VitalSigns} from "../../api/vitalSigns";
import {ElderlyVitalSignesService} from "../../services/elderlyVitalSignes.service";

import {DatePipe, NgClass, NgIf, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";


@Component({
  selector: 'app-life-vital',
  standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        FileUploadModule,
        InputTextModule,
        RippleModule,
        SharedModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        NgStyle,

        DatePipe,
        NgClass,
        FormsModule,
        CalendarModule,
        NgIf

    ],
  templateUrl: './life-vital.component.html',
  styleUrl: './life-vital.component.scss',
    providers: [ElderlyVitalSignesService,MessageService]
})
export class LifeVitalComponent implements OnInit {





@ViewChild('filter') filter!: ElementRef;

    vitalSign: VitalSigns[] = [];
    vitalSigns : VitalSigns = {};
    loading: boolean = true;
    vitalSigneEdit: boolean = false;
    vitalSigneDelete : boolean = false;
    vitalSignAdd: boolean = false;
    vitalSignsAdd: boolean = false;
    vitalSignsEdit: boolean = false;
    oxygenSaturationEdited: boolean = false;
    temperatureEdited: boolean = false;
    heartRateEdited: boolean = false;
    respiratoryRateEdited: boolean = false;

    latestUpdates: VitalSigns;

    constructor(private elderlyVitalSignesService: ElderlyVitalSignesService ,private service: MessageService) {

    }

    ngOnInit() {
        this.loadVitalSignes();

        this.getLatestUpdates();
    }
    getLatestUpdates() {
        this.elderlyVitalSignesService.getLatestAttributeUpdates().subscribe(
            (data: VitalSigns) => {
                this.latestUpdates = data;
            },
            (error) => {
                console.error('Error fetching latest updates:', error);
            }
        );
    }
    loadVitalSignes() {
        this.elderlyVitalSignesService.getAllVitalSigns().subscribe(
            vitalSignes => {
                this.vitalSign = vitalSignes;

                this.loading = false;
            },
            error => {
                console.error('Error fetching vital signs:', error);
                this.loading = false;
            }
        );
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    /*add*/
    addVitalSigns(vitalSigne: VitalSigns) {
        this.vitalSigns = { ...vitalSigne };
        this.vitalSignsAdd =true;
    }


    hideAdd() {
        this.vitalSignsAdd=false;
    }

    saveAdd() {
        console.log('Saving health metrics:', this.vitalSigns);
        this.vitalSignAdd = true;
        this.hideAdd();
    }
    confirmAddSelected() {
        console.log('Deleting vital sign:', this.vitalSigns);
        this.elderlyVitalSignesService.addVitalSigns(this.vitalSigns).subscribe(() => {
            this.showSuccessViaToast('Vital sign added successfully.');
            this.loadVitalSignes(); // Reload data after deletion
            this.vitalSignAdd = false; // Hide the confirmation dialog
            this.getLatestUpdates();
        }, error => {
            console.error('Error deleting vital sign:', error);
            this.showErrorViaToast('Failed to add vital sign.');
            this.vitalSignAdd = false; // Hide the confirmation dialog
        });
        this.vitalSigns = {};
    }
/*edit*/
    editVitalSigns(vitalSigne: VitalSigns) {
        this.vitalSignsEdit = true;
        this.vitalSigns = { ...vitalSigne };
        this.elderlyVitalSignesService.getVitalSignsById(this.vitalSigns.id).subscribe(() => {

        }, error => {
            console.error('Error fetching vital sign:', error);


        });

    }
    confirmEditSelected() {
        console.log('Updating vital sign:', this.vitalSigns);
        this.elderlyVitalSignesService.updateVitalSigns(this.vitalSigns.id!, this.vitalSigns).subscribe(() => {
            this.showSuccessViaToast('Vital sign updated successfully.');
            this.loadVitalSignes(); // Reload data after update
            this.vitalSigneEdit = false; // Hide the confirmation dialog
            this.getLatestUpdates();
        }, error => {
            console.error('Error updating vital sign:', error);
            this.showErrorViaToast('Failed to update vital sign.');
            this.vitalSigneEdit = false; // Hide the confirmation dialog
        });
        this.vitalSigns = {};
    }
    hideEdit() {
        this.vitalSignsEdit=false;
    }

    saveEdit() {
        this.vitalSigneEdit = true;
        console.log('Saving health metrics:', this.vitalSigns);
        this.hideEdit();
    }
    /*delete*/
    deleteVitalSigns(vitalSigne: VitalSigns) {
        this.vitalSigneDelete = true;
        this.vitalSigns = { ...vitalSigne };
    }

    confirmDeleteSelected() {
        console.log('Deleting vital sign:', this.vitalSigns);
        this.elderlyVitalSignesService.deleteVitalSigns(this.vitalSigns.id).subscribe(() => {
            this.showSuccessViaToast('Vital sign deleted successfully.');
            this.loadVitalSignes(); // Reload data after deletion
            this.vitalSigneDelete = false; // Hide the confirmation dialog
            this.getLatestUpdates();
        }, error => {
            console.error('Error deleting vital sign:', error);
            this.showErrorViaToast('Failed to delete vital sign.');
            this.vitalSigneDelete = false; // Hide the confirmation dialog
        });
        this.vitalSigns = {};
    }

    /*toast*/
    showErrorViaToast(message: string) {
        this.vitalSigneDelete = false;
        this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: message, life: 1000 });
    }

    showSuccessViaToast(message: string) {
        this.service.add({ key: 'tst', severity: 'success', summary: 'Success', detail: message, life: 1000 });
    }


    /*safety*/

    isSafe(value: number | undefined): boolean {
        // Define safe ranges or thresholds for each vital sign
        const safeRanges = {
            oxygenSaturation: { min: 95, max: 100 },
            temperature: { min: 36.1, max: 37.2 }, // Celsius
            respiratoryRate: { min: 12, max: 20 }
        };

        // Determine which vital sign is being checked

        const vitalSign = value === this.vitalSigns.oxygenSaturation ? 'oxygenSaturation' :
            value === this.vitalSigns.temperature ? 'temperature' :
                value === this.vitalSigns.respiratoryRate ? 'respiratoryRate' : '';


        // If the vital sign is known and within the safe range, return true (safe), otherwise return false (danger)
        return vitalSign && value !== undefined && value >= safeRanges[vitalSign].min && value <= safeRanges[vitalSign].max;
    }

    // Method to update safety status when input changes
    updateSafetyStatus(vitalSign: string) {
        // Set the corresponding flag to true when the input field is edited
        if (vitalSign === 'oxygenSaturation') {
            this.oxygenSaturationEdited = true;
        } else if (vitalSign === 'temperature') {
            this.temperatureEdited = true;
        } else if (vitalSign === 'respiratoryRate') {
            this.respiratoryRateEdited = true;
        }
    }

}
