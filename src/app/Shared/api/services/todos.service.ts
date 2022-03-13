import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PostTask, TaskResponse } from '../modals/taskResponse.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private route: Router, private http: HttpClient) {}

  addTask(data: {
    description: string;
    completed: boolean;
  }): Observable<PostTask> {
    return this.http.post<PostTask>(`${environment.api_url}/tasks`, data);
  }

  getTask(): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${environment.api_url}/tasks`);
  }
}
