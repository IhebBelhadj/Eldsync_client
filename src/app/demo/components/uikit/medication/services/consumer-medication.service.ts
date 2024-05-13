import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medication } from '../model/medication';

@Injectable({
  providedIn: 'root'
})
export class ConsumerMedicationService {
  private apiUrl = 'http://localhost:8089/exam/Medication';

  constructor(private http: HttpClient) { }

  getMedications(): Observable<Medication[]> {
    return this.http.get<Medication[]>(`${this.apiUrl}/getAllMedications`);
  }

  getMedicationById(id: number): Observable<Medication> {
    return this.http.get<Medication>(`${this.apiUrl}/getMedicationById/${id}`);
  }
  
  addMedication(m: Medication): Observable<any> {
    return this.http.post(`${this.apiUrl}/addMedication`, m);
  }
  
  deleteMedication(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteMedication/${id}`);
  }
  
  updateMedication(m: Medication, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateMedication/${id}`, m);
  }
 
}
