import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from "rxjs";
import { Task } from './task';

//After that we write all methods related to consume web in task.service.ts
 @Injectable({
  providedIn: 'root'
})

export class TaskService {
  url = 'http://localhost:13265/api/Tasks_Dto';



  constructor(private http: HttpClient) { }



  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url + '/')
  }
  getTaskById(taskId: string): Observable<Task> {
    return this.http.get<Task>(this.url + '/' + taskId)
  }
  createTask(task: Task): Observable<Task> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<Task>(this.url + '/',
    task, httpOptions)
  }
  updateTask(task: Task): Observable<Task> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<Task>(this.url + '/UpdateTaskDetails?id='+task.id+'',
    task, httpOptions)
  }
  deleteTaskById(taskid: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<number>(this.url + '/DeleteTaskDetails?id=' +taskid,
 httpOptions)
  }

}



