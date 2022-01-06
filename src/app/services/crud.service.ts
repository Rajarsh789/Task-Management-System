import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const apiUrl = `https://devza.com/tests/tasks/`

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  httpOptions = {
    headers: new HttpHeaders({
      'AuthToken': 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a',
    })
  };
  constructor(private http: HttpClient) { }

  // FOR USER LIST
  getUserList(): Observable<any[]> {
    const url = `${apiUrl}listusers`
    return this.http.get<any>(url, this.httpOptions)
  }

  //FOR USER TASK LIST
  getTaskList(): Observable<any[]> {
    const url = `${apiUrl}list`
    return this.http.get<any>(url, this.httpOptions)
  }


  // FOR ADD TASK
  addTask(payLoad: any): Observable<any> {
    const url = `${apiUrl}create`
    return this.http.post<any>(url, payLoad, this.httpOptions);
  }

  //UPDATE TASK 
  updateTask(payLoad:any) {
    console.log(payLoad);
    const url = `${apiUrl}update`
    return this.http.post<any>(url, payLoad, this.httpOptions);
  }

  // FOR DELETE TASK
  deleteTask(payLoad: any): Observable<any[]> {
    const url = `${apiUrl}delete`
    return this.http.post<any>(url, payLoad, this.httpOptions)
  }





}
