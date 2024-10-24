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
import {NgClass, NgStyle} from "@angular/common";

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
        NgStyle
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
    healthMetricStat: boolean = false;
    healthMetricDelete: boolean = false;
    healthMetricAdd: boolean = false;
    cholesterolLvlEdited: boolean = false;
    bloodGlucoseLvlEdited: boolean = false;
    weightEdited: boolean = false;

    constructor(private elderlyHealthMetricService: ElderlyHealthMetricService, private service: MessageService){

    }

    ngOnInit() {
        this.loadHealthMetric();
    }
    openNew() {
        this.healthMetricAdd = true;
    }

    hideADD() {
        this.healthMetricAdd = false;
    }

    saveADD() {
        console.log('Saving health metrics:', this.healthMetrics);
        this.healthMetrics = {};
        this.hideADD();
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



    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    confirmDeleteSelected() {
        this.showSuccessViaToast();
    }

    showErrorViaToast() {
        this.healthMetricDelete = false;
        this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'Deletion failed' , life: 1000 });
    }

    showSuccessViaToast() {
        this.service.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'Successful Deletion ' , life: 1000 });
    }

    editHealthMetric(healthMetric: HealthMetric[]) {
        this.healthMetricAdd = true;
        this.healthMetric = { ...healthMetric };

    }

    deleteHealthMetric(healthMetric: HealthMetric[]) {
        this.healthMetricDelete = true;
        this.healthMetric = { ...healthMetric };
    }
}

