import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { ReceveurDto } from './receveurdto';


@Injectable({
  providedIn: 'root'
})
export class ReceveurService {

  constructor(private http: HttpClient) { }

  getReceveurs(): Observable<ReceveurDto[]> {
    return this.http.get<ReceveurDto[]>('http://localhost:8080/receveur')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
getReceveur(id: number): Observable<ReceveurDto> {
    if (id === 0) {
      return of(this.initializeReceveur());
    }
    const url = `http://localhost:8080/receveur/{id}`;
    return this.http.get<ReceveurDto>(url)
      .pipe(
        tap(data => console.log('getReceveur: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  

  

  
  createReceveur(receveur: ReceveurDto): Observable<ReceveurDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ReceveurDto>('http://localhost:8080//add-receveur', receveur, { headers: headers })
      .pipe(
        tap(data => console.log('createReceveur: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   

  deleteReceveur(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `delete-receveur/${id}`;
    return this.http.delete<ReceveurDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteReceveur: ' + id)),
        catchError(this.handleError)
      );
  }



  

  updateReceveur(receveur: ReceveurDto): Observable<ReceveurDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://localhost:8080//update-receveur/${receveur.id}';
    return this.http.put<ReceveurDto>(url, receveur, { headers: headers })
      .pipe(
        tap(() => console.log('updateReceveur: ' + receveur.id)),
        map(() => receveur),
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

  private initializeReceveur(): ReceveurDto {
    
    return {
     id: 0,
      addressReceveur :null,
      cityReceveur :null,
      emailReceveur :null,
    lastNameReceveur :null,
    nameReceveur :null,
    phoneReceveur :null
    };
  }

  
  }

