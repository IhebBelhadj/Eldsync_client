import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

    private apiUrl = 'http://localhost:8089/exam/user';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getAllTasks`);
  }

  getTaskById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/getTaskById/${id}`);
  }
  
  addTask(m: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/addTask`, m);
  }
  

}
