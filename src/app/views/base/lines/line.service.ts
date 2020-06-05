import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { LineDto } from './linedto';


@Injectable({
  providedIn: 'root'
})
export class LineService {

  constructor(private http: HttpClient) { }

  getLines(): Observable<LineDto[]> {
    return this.http.get<LineDto[]>('http://localhost:8080/line')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
getLine(id: number): Observable<LineDto> {
    if (id === 0) {
      return of(this.initializeLine());
    }
    const url = `http://localhost:8080/line/{id}`;
    return this.http.get<LineDto>(url)
      .pipe(
        tap(data => console.log('getLine: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  

  

  
  createLine(line: LineDto): Observable<LineDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LineDto>('http://localhost:8080/add-line', line, { headers: headers })
      .pipe(
        tap(data => console.log('createLine: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   

  deleteLine(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `delete-line/${id}`;
    return this.http.delete<LineDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteLine: ' + id)),
        catchError(this.handleError)
      );
  }



  

  updateLine(line: LineDto): Observable<LineDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://localhost:8080//update-line/${line.id}';
    return this.http.put<LineDto>(url, line, { headers: headers })
      .pipe(
        tap(() => console.log('updateLine: ' + line.id)),
        map(() => line),
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

  private initializeLine(): LineDto {
    
    return {
     id: 0,
     nameLine: null
    };
  }

  
  }

