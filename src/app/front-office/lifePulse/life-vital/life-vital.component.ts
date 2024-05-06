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
import {VitalSigns} from "../../../../api/vitalSigns";
import {ElderlyVitalSignesService} from "../../../../service/elderlyVitalSignes.service";
import {DatePipe, NgStyle} from "@angular/common";

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
        DatePipe
    ],
  templateUrl: './life-vital.component.html',
  styleUrl: './life-vital.component.scss',
    providers: [ElderlyVitalSignesService,MessageService]
})
export class LifeVitalComponent implements OnInit {





@ViewChild('filter') filter!: ElementRef;
    vitalSignes: VitalSigns[] = [];
    vitalSigne : VitalSigns = {};
    loading: boolean = true;
    vitalSigneEdit: boolean = false;
    vitalSigneDelete : boolean = false;
    vitalSigneAdd: boolean = false;
    oxygenSaturationEdited: boolean = false;
    temperatureEdited: boolean = false;
    respiratoryRateEdited: boolean = false;
    constructor(private elderlyVitalSignesService: ElderlyVitalSignesService ,private service: MessageService) {

    }

    ngOnInit() {
        this.loadVitalSignes();
    }

    loadVitalSignes() {
        this.elderlyVitalSignesService.getAllVitalSigns().subscribe(
            vitalSignes => {
                this.vitalSignes = vitalSignes;
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

    editVitalSigns(vitalSigne: VitalSigns) {
        this.vitalSigneAdd = true;
        this.vitalSigne = { ...vitalSigne };

    }

    deleteVitalSigns(vitalSigne: VitalSigns) {
        this.vitalSigneDelete = true;
        this.vitalSigne = { ...vitalSigne };
    }

    confirmDeleteSelected() {
        this.showSuccessViaToast();
    }

    showErrorViaToast() {
        this.vitalSigneDelete = false;
        this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'Deletion failed' , life: 1000 });
    }

    showSuccessViaToast() {
        this.service.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'Successful Deletion ' , life: 1000 });
    }

    addVitalSigns(vitalSigne: VitalSigns) {
        this.vitalSigneAdd =! this.vitalSigneAdd;
    }

    hideVitalSigneADD() {

    }

    saveVitalSigns() {

    }
    isSafe(value: number | undefined): boolean {
        // Define safe ranges or thresholds for each vital sign
        const safeRanges = {
            oxygenSaturation: { min: 95, max: 100 },
            temperature: { min: 36.1, max: 37.2 }, // Celsius
            respiratoryRate: { min: 12, max: 20 }
        };

        // Determine which vital sign is being checked
        const vitalSign = value === this.vitalSigne.oxygenSaturation ? 'oxygenSaturation' :
            value === this.vitalSigne.temperature ? 'temperature' :
                value === this.vitalSigne.respiratoryRate ? 'respiratoryRate' : '';

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
