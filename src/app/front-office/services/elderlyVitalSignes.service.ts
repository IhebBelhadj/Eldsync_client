import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VitalSigns } from '../api/vitalSigns';
import {Observable} from "rxjs";
import {HealthMetric} from "../api/healthMetric";

@Injectable()
export class ElderlyVitalSignesService {
    private apiUrl = 'http://localhost:8081/api/vitalsigns';
    constructor(private http: HttpClient) { }

    getAllVitalSigns(): Observable<VitalSigns[]> {
        return this.http.get<VitalSigns[]>(this.apiUrl);
    }

    getVitalSignsById(id: number): Observable<VitalSigns> {
        return this.http.get<VitalSigns>(`${this.apiUrl}/${id}`);
    }

    addVitalSigns(vitalSigns: VitalSigns): Observable<VitalSigns> {
        return this.http.post<VitalSigns>(this.apiUrl, vitalSigns);
    }

    updateVitalSigns(id: number, newVitalSigns: VitalSigns): Observable<VitalSigns> {
        return this.http.put<VitalSigns>(`${this.apiUrl}/${id}`, newVitalSigns);
    }

    deleteVitalSigns(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    createHealthAlertsForDangerousLevels(newVitalSigns: VitalSigns): Observable<VitalSigns> {
        return this.http.post<any>(`${this.apiUrl}/health-alerts`, newVitalSigns);
    }
    getLatestAttributeUpdates(): Observable<VitalSigns> {
        return this.http.get<VitalSigns>(`${this.apiUrl}/latestupdates`);
    }
}

