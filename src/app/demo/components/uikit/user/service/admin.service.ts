import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8081/api/getAllUsers');
  }
  deleteUserById(userId: number): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:8081/api/deleteUser/${userId}`
    );
  }
  updateUserRole(userId: number, role: string): Observable<any> {
    return this.http.post(`http://localhost:8081/api/updateUser/${userId}`, {
      role,
    });
  }
}
