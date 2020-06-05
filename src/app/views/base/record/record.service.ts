import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { RecordDto } from './recorddto';


@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

  getRecords(): Observable<RecordDto[]> {
    return this.http.get<RecordDto[]>('http://localhost:8080/record')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
getRecord(id: number): Observable<RecordDto> {
    if (id === 0) {
      return of(this.initializeRecord());
    }
    const url = `http://localhost:8080/record/{id}`;
    return this.http.get<RecordDto>(url)
      .pipe(
        tap(data => console.log('getRecord: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  

  

  
  createRecord(record: RecordDto): Observable<RecordDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RecordDto>('http://localhost:8080//add-record', record, { headers: headers })
      .pipe(
        tap(data => console.log('createRecord: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   

  deleteRecord(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `delete-record/${id}`;
    return this.http.delete<RecordDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteRecord: ' + id)),
        catchError(this.handleError)
      );
  }



  

  updateRecord(record: RecordDto): Observable<RecordDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://localhost:8080//update-record/${record.id}';
    return this.http.put<RecordDto>(url, record, { headers: headers })
      .pipe(
        tap(() => console.log('updateRecord: ' + record.id)),
        map(() => record),
        catchError(this.handleError)
      );
  }

  

  private handleError(err) {
    
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
     
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
     
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeRecord(): RecordDto {
    
    return {
     id: 0,
     dateRecord :null,
   timeRecord :null,
   descriptionRecord :null,
    };
  }

  
  }

