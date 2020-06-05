import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { RapportTravailDto } from './rapporttravaildto';
import { RapportDto } from './rapportdto';


@Injectable({
  providedIn: 'root'
})
export class RapportService {

  constructor(private http: HttpClient) { }

  getRapportsTravail(): Observable<RapportTravailDto[]> {
    return this.http.get<RapportTravailDto[]>('http://localhost:8080/listRapportAccidentTravail')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getRapportsCollision(): Observable<RapportDto[]> {
    return this.http.get<RapportDto[]>('http://localhost:8080/listRapportAccidentCollision')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   getRapportsRoute(): Observable<RapportDto[]> {
    return this.http.get<RapportDto[]>('http://localhost:8080/listRapportAccidentRoute')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  

  

  
  createRapportTravail(rapport: RapportTravailDto): Observable<RapportTravailDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RapportTravailDto>('http://localhost:8080/add-rapport-travail', rapport, { headers: headers })
      .pipe(
        tap(data => console.log('createRapportTravail: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   createRapportCollision(rapport: RapportDto): Observable<RapportDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RapportDto>('http://localhost:8080//add-rapport-collision', rapport, { headers: headers })
      .pipe(
        tap(data => console.log('createRapportCollision: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   createRapportRoute(rapport: RapportDto): Observable<RapportDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RapportDto>('http://localhost:8080/add-rapport-route', rapport, { headers: headers })
      .pipe(
        tap(data => console.log('createRapportRoute: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteRapportTravail(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `delete-rapport/${id}`;
    return this.http.delete<RapportTravailDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteRapportTravail: ' + id)),
        catchError(this.handleError)
      );
  }

deleteRapportCollision(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `delete-rapport/${id}`;
    return this.http.delete<RapportDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteRapportCollision: ' + id)),
        catchError(this.handleError)
      );
  }
  deleteRapportRoute(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `delete-rapport/${id}`;
    return this.http.delete<RapportDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteRapportRoute: ' + id)),
        catchError(this.handleError)
      );
  }


  

  updateRapportTravail(rapport: RapportTravailDto): Observable<RapportTravailDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://localhost:8080//update-rapport-travail/${rapport.id}';
    return this.http.put<RapportTravailDto>(url, rapport, { headers: headers })
      .pipe(
        tap(() => console.log('updateRapport: ' + rapport.id)),
        map(() => rapport),
        catchError(this.handleError)
      );
  }

   updateRapportCollision(rapport: RapportDto): Observable<RapportDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://localhost:8080//update-rapport-collision/${rapport.id}`;
    return this.http.put<RapportDto>(url, rapport, { headers: headers })
      .pipe(
        tap(() => console.log('updateRapport: ' + rapport.id)),
        map(() => rapport),
        catchError(this.handleError)
      );
  }

   updateRapportRoute(rapport: RapportDto): Observable<RapportDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://localhost:8080//update-rapport-route/${rapport.id}`;
    return this.http.put<RapportDto>(url, rapport, { headers: headers })
      .pipe(
        tap(() => console.log('updateRapport: ' + rapport.id)),
        map(() => rapport),
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

  private initializeRapportTravail(): RapportTravailDto {
    
    return {
     id: 0,
 nameLine :null,
   localisation :null,
   nameDistrict :null,
     numTransport :null,
   timeAccident :null,
   dateAccident :null,
     function :null,
   typeAccTravail :null,
   descriptionDegat :null
    };
  }

  private initializeRapportCollision(): RapportDto {
    
    return {
     id: 0,
 nameLine :null,
   localisation :null,
   nameDistrict :null,
     numTransport :null,
   timeAccident :null,
   dateAccident :null,
     nameChauffeur :null,
   nameReceveur :null,
   descriptionDegat :null
    };
  }

  private initializeRapportRoute(): RapportDto {
    
    return {
      id: 0,
 nameLine :null,
   localisation :null,
   nameDistrict :null,
     numTransport :null,
   timeAccident :null,
   dateAccident :null,
     nameChauffeur :null,
   nameReceveur :null,
   descriptionDegat :null
    };
    }
  }

