import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { VictimeDto } from './victimedto';


@Injectable({
  providedIn: 'root'
})
export class VictimeService {

  constructor(private http: HttpClient) { }

  getVictimes(): Observable<VictimeDto[]> {
    return this.http.get<VictimeDto[]>('http://localhost:8080/list-victime')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
getVictime(id: number): Observable<VictimeDto> {
    if (id === 0) {
      return of(this.initializeVictime());
    }
    const url = `http://localhost:8080/victime/{id}`;
    return this.http.get<VictimeDto>(url)
      .pipe(
        tap(data => console.log('getVictime: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  

  

  
  createVictime(victime: VictimeDto): Observable<VictimeDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<VictimeDto>('http://localhost:8080/add-Victime', victime, { headers: headers })
      .pipe(
        tap(data => console.log('createVictime: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   

  deleteVictime(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `delete-victime/${id}`;
    return this.http.delete<VictimeDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteVictime: ' + id)),
        catchError(this.handleError)
      );
  }



  

  updateVictime(victime: VictimeDto): Observable<VictimeDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://localhost:8080//update-victime/${victime.id}';
    return this.http.put<VictimeDto>(url, victime, { headers: headers })
      .pipe(
        tap(() => console.log('updateVictime: ' + victime.id)),
        map(() => victime),
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

  private initializeVictime(): VictimeDto {
    
    return {
     id: 0,
     corpBlesser: null,
     niveauBlessure: null,
     etatVictime: null,
     typeVictime: null,
     lastNameVictime: null,
     nameVictime: null
    };
  }

  
  }

