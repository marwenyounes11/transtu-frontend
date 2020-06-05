import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { EmplacementDto } from './emplacementdto';


@Injectable({
  providedIn: 'root'
})
export class EmplacementService {

  constructor(private http: HttpClient) { }

  getEmplacements(): Observable<EmplacementDto[]> {
    return this.http.get<EmplacementDto[]>('http://localhost:8080/list-emplacement')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
getEmplacement(id: number): Observable<EmplacementDto> {
    if (id === 0) {
      return of(this.initializeEmplacement());
    }
    const url = `http://localhost:8080/emplacement/{id}`;
    return this.http.get<EmplacementDto>(url)
      .pipe(
        tap(data => console.log('getEmplacement: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  

  

  
  createEmplacement(emplacement: EmplacementDto): Observable<EmplacementDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<EmplacementDto>('http://localhost:8080/add-emplacement', emplacement, { headers: headers })
      .pipe(
        tap(data => console.log('createEmplacement: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   

  deleteEmplacement(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `delete-emplacement/${id}`;
    return this.http.delete<EmplacementDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteEmplacement: ' + id)),
        catchError(this.handleError)
      );
  }



  

  updateEmplacement(emplacement: EmplacementDto): Observable<EmplacementDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://localhost:8080/update-emplacement/${emplacement.id}';
    return this.http.put<EmplacementDto>(url, emplacement, { headers: headers })
      .pipe(
        tap(() => console.log('updateEmplacement: ' + emplacement.id)),
        map(() => emplacement),
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

  private initializeEmplacement(): EmplacementDto {
    
    return {
     id: 0,
      delegation: null,
      gouvernorat: null,
     localisation: null,
     districtId: 0
    };
  }

  
  }

