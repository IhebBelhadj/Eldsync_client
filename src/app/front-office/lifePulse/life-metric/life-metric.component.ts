import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {HealthMetric} from "../../api/healthMetric";
import {ElderlyHealthMetricService} from "../../services/elderlyHealthMetric.service";
import {DatePipe, NgClass, NgIf, NgStyle} from "@angular/common";
import {VitalSigns} from "../../api/vitalSigns";



@Component({
  selector: 'app-life-metric',
  standalone: true,
    imports: [
        ButtonModule,
        CalendarModule,
        DialogModule,
        FileUploadModule,
        InputTextModule,
        ReactiveFormsModule,
        RippleModule,
        SharedModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        NgClass,
        FormsModule,
        NgStyle,
        NgIf,
        DatePipe


    ],
  templateUrl: './life-metric.component.html',
  styleUrl: './life-metric.component.scss',
    providers: [ElderlyHealthMetricService,MessageService]
})
export class LifeMetricComponent implements OnInit {





    @ViewChild('filter') filter!: ElementRef;
    healthMetric: HealthMetric[] = [];
    healthMetrics : HealthMetric = {};
    loading: boolean = true;
    healthMetricAdd: boolean = false;
    cholesterolLvlEdited: boolean = false;
    bloodGlucoseLvlEdited: boolean = false;
    weightEdited: boolean = false;


    healthMetricDeleteConfirmation: boolean= false;
    healthMetricEditConfirmation: boolean= false;
    healthMetricAddConfirmation: boolean= false;
    latestUpdates:HealthMetric;
    healthMetricEdit: boolean=false;
    HeightEdited: boolean= false;

    constructor(private elderlyHealthMetricService: ElderlyHealthMetricService, private service: MessageService){

    }

    ngOnInit() {
        this.loadHealthMetric();


        this.getLatestUpdates();
    }
    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    /*load*/
    loadHealthMetric() {
        this.elderlyHealthMetricService.getAllHealthMetrics().subscribe(
            healthMetric => {
                this.healthMetric = healthMetric;
                this.loading = false;
            },
            error => {
                console.error('Error fetching Health Metric:', error);
                this.loading = false;
            }
        );
    }

    /*latest*/
    getLatestUpdates() {
        // Call the service method and subscribe to the returned Observable
        this.elderlyHealthMetricService.getLastUpdatesForAttributes().subscribe(
            (data: HealthMetric) => {
                this.latestUpdates = data;
                console.log('Latest updates:', data);
            },
            (error) => {
                // Handle error here
                console.error('Error fetching latest updates:', error);
            }
        );
    }

/*add*/
    addHealthMetric(healthMetric: HealthMetric) {
        this.healthMetrics = { ...healthMetric };

        this.healthMetricAdd = true;
    }

    hideADD() {
        this.healthMetricAdd = false;
    }

    saveADD() {
        console.log('Saving health metrics:', this.healthMetrics);


        /*this.healthMetrics = {};*/
        this.healthMetricAddConfirmation = true;
        this.hideADD();
    }


    confirmAddSelected() {
        console.log('Adding health metric:', this.healthMetrics);
        this.elderlyHealthMetricService.addHealthMetric(this.healthMetrics).subscribe(() => {
            this.showSuccessViaToast('Health metric added successfully.');
            this.loadHealthMetric(); // Reload data after addition
            this.healthMetricAddConfirmation = false; // Hide the confirmation dialog
            this.getLatestUpdates();
        }, error => {
            console.error('Error adding health metric:', error);
            this.showErrorViaToast('Failed to add health metric.');
            this.healthMetricAddConfirmation = false; // Hide the confirmation dialog
        });
        this.healthMetrics = {};
    }
/*edit*/
    hideEdit() {
        this.healthMetricEdit = false;
    }

    saveEdit() {
        console.log('Saving health metrics:', this.healthMetrics);
        this.healthMetricEditConfirmation = true;
        this.hideEdit();
    }
    confirmEditSelected() {
        console.log('Updating health metric:', this.healthMetrics);
        this.elderlyHealthMetricService.updateHealthMetric(this.healthMetrics.id!, this.healthMetrics).subscribe(() => {
            this.showSuccessViaToast('Health metric updated successfully.');
            this.loadHealthMetric(); // Reload data after update
            this.healthMetricEditConfirmation = false; // Hide the confirmation dialog
            this.getLatestUpdates();
        }, error => {
            console.error('Error updating health metric:', error);
            this.showErrorViaToast('Failed to update health metric.');
            this.healthMetricEditConfirmation = false; // Hide the confirmation dialog
        });
        this.healthMetrics = {};
    }
    editHealthMetric(healthMetric: HealthMetric) {
        this.healthMetricEdit = true;
        this.healthMetrics = { ...healthMetric };
        this.elderlyHealthMetricService.getHealthMetricById(this.healthMetrics.id).subscribe(() => {

        }, error => {
            console.error('Error fetching Health metric:', error);


        });

    }



    /*delete*/
    deleteHealthMetric(healthMetric: HealthMetric) {
        this.healthMetricDeleteConfirmation = true;
        this.healthMetrics = { ...healthMetric };
    }
    confirmDeleteSelected() {
        console.log('Deleting health metric:', this.healthMetrics);
        this.elderlyHealthMetricService.deleteHealthMetric(this.healthMetrics.id).subscribe(() => {
            this.showSuccessViaToast('Health metric deleted successfully.');
            this.loadHealthMetric(); // Reload data after deletion
            this.healthMetricDeleteConfirmation = false; // Hide the confirmation dialog
            this.getLatestUpdates();
        }, error => {
            console.error('Error deleting health metric:', error);
            this.showErrorViaToast('Failed to delete health metric.');
            this.healthMetricDeleteConfirmation = false; // Hide the confirmation dialog
        });
        this.healthMetrics = {};
    }
    /*safe*/


    isSafe(value: number): boolean {
        // Define safe ranges or thresholds for each metric
        const safeRanges = {
            cholesterolLvl: { min: 0, max: 200 },
            bloodGlucoseLvl: { min: 70, max: 140 },
            weight: { min: 50, max: 100 }
        };

        // Determine which metric is being checked
        const metric = value === this.healthMetrics.cholesterolLvl ? 'cholesterolLvl' :
            value === this.healthMetrics.bloodGlucoseLvl ? 'bloodGlucoseLvl' :
                value === this.healthMetrics.weight ? 'weight' : '';

        // If the metric is known and within the safe range, return true (safe), otherwise return false (danger)
        return metric && value !== undefined && value >= safeRanges[metric].min && value <= safeRanges[metric].max;
    }


    updateSafetyStatus(metric: string) {
        if (metric === 'cholesterolLvl') {
            this.cholesterolLvlEdited = true;
        } else if (metric === 'bloodGlucoseLvl') {
            this.bloodGlucoseLvlEdited = true;
        } else if (metric === 'weight') {
            this.weightEdited = true;
        }
    }




    /*toast*/

    showErrorViaToast(message: string) {
        this.healthMetricDeleteConfirmation = false;
        this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: message, life: 1000 });
    }

    showSuccessViaToast(message: string) {
        this.service.add({ key: 'tst', severity: 'success', summary: 'Success', detail: message, life: 1000 });
    }





}

