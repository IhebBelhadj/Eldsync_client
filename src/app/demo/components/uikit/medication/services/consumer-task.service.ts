import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { Elder } from '../model/Elder';
@Injectable({
  providedIn: 'root'
})
export class ConsumerTaskService {
  
  private apiUrl = 'http://localhost:8089/exam/task';
  private baseUrl = 'http://localhost:8089/exam/elder';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/getAllTasks`);
  }

  addTask(taskDto: Task, elderUsername: string): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/add`, taskDto, { params: { elderUsername } });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteTask/${id}`);
  }
  
  updateTask(task: Task, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateTask/${id}`, task);
  }
  
  markTaskAsCompleted(taskId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${taskId}/complete`, {});
  }

  markTaskAsCancelled(taskId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${taskId}/cancel`, {});
  }

  getCompletedTaskCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/completed/count`);
  }
  
  getCancelledTaskCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/cancelled/count`);
  }

  getTodoTaskCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/todo/count`);
  }

  getTasksForTodayCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/countForToday`);
  }
  
  getElders(): Observable<Elder[]> {
    return this.http.get<Elder[]>(`${this.baseUrl}/all`);
  }

  getAllElderUsernames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/usernames`);
  }
}
