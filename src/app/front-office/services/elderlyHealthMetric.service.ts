import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HealthMetric } from '../api/healthMetric';
import {Observable} from "rxjs";

import {VitalSigns} from "../api/vitalSigns";

@Injectable()
export class ElderlyHealthMetricService {
    private baseUrl = 'http://localhost:8081/api/healthmetrics';

    constructor(private http: HttpClient) { }

    getAllHealthMetrics(): Observable<HealthMetric[]> {
        return this.http.get<HealthMetric[]>(this.baseUrl);
    }

    getHealthMetricById(id: number): Observable<HealthMetric> {
        return this.http.get<HealthMetric>(`${this.baseUrl}/${id}`);
    }

    addHealthMetric(healthMetric: HealthMetric): Observable<HealthMetric> {
        return this.http.post<HealthMetric>(this.baseUrl, healthMetric);
    }

    updateHealthMetric(id: number, healthMetric: HealthMetric): Observable<HealthMetric> {
        return this.http.put<HealthMetric>(`${this.baseUrl}/${id}`, healthMetric);
    }

    deleteHealthMetric(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
    createHealthAlertsForDangerousLevels(healthMetric: HealthMetric): Observable<HealthMetric> {
        return this.http.post<any>(`${this.baseUrl}/health-alerts`, healthMetric);
    }


    getLastUpdatesForAttributes(): Observable<HealthMetric> {
        return this.http.get<VitalSigns>(`${this.baseUrl}/latest-updates`);
    }

}




