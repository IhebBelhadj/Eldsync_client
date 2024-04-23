import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
@Injectable({
  providedIn: 'root'
})
export class ConsumerTaskService {
  
  private apiUrl = 'http://localhost:8089/exam/task';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/getAllTasks`);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/getTaskById/${id}`);
  }
  
  addTask(m: Task): Observable<any> {
    return this.http.post(`${this.apiUrl}/addTask`, m);
  }
  
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteTask/${id}`);
  }
  
  updateTask(m: Task, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateTask/${id}`, m);
  }
 
}
