import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Accident } from './accident';
import { AccidentTravailDto } from './accidenttravaildto';
import { AccidentRouteDto } from './accidentroutedto';
import { AccidentCollisionDto } from './accidentcollisiondto';
import { AccidentTravail } from './accidenttravail';
import { AccidentCollision } from './accidentcollision';
import { AccidentRoute } from './accidentroute';


@Injectable({
  providedIn: 'root'
})
export class AccidentService {

  constructor(private http: HttpClient) { }

  getAccidentsTravail(): Observable<AccidentTravailDto[]> {
    return this.http.get<AccidentTravailDto[]>('http://localhost:8080/list-accidents-travail')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAccidentsCollision(): Observable<AccidentCollisionDto[]> {
    return this.http.get<AccidentCollisionDto[]>('http://localhost:8080/list-accidents-collision')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAccidentsRoute(): Observable<AccidentRouteDto[]> {
    return this.http.get<AccidentRouteDto[]>('http://localhost:8080/list-accidents-route')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAccidentTravail(id: number): Observable<AccidentTravail> {
    if (id === 0) {
      return of(this.initializeAccidentTravail());
    }
    const url = `http://localhost:8080/accidents-travail/${id}`;
    return this.http.get<AccidentTravail>(url)
      .pipe(
        tap(data => console.log('getAccidentTravail: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAccidentCollision(id: number): Observable<AccidentCollision> {
    if (id === 0) {
      return of(this.initializeAccidentCollision());
    }
    const url = `http://localhost:8080/accidents-collision/${id}`;
    return this.http.get<AccidentCollision>(url)
      .pipe(
        tap(data => console.log('getAccidentCollision: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAccidentRoute(id: number): Observable<AccidentRoute> {
    if (id === 0) {
      return of(this.initializeAccidentRoute());
    }
    const url = `http://localhost:8080/accidents-route/${id}`;
    return this.http.get<AccidentRoute>(url)
      .pipe(
        tap(data => console.log('getAccidentRoute: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createAccidentTravail(accident: AccidentTravailDto): Observable<AccidentTravail> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AccidentTravail>('http://localhost:8080/add-accident-travail', accident, { headers: headers })
      .pipe(
        tap(data => console.log('createAccidentTravail: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   createAccidentCollision(accident: AccidentCollisionDto): Observable<AccidentCollision> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AccidentCollision>('http://localhost:8080/add-accident-Collission', accident, { headers: headers })
      .pipe(
        tap(data => console.log('createAccidentCollision: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   createAccidentRoute(accident: AccidentRouteDto): Observable<AccidentRoute> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AccidentRoute>('http://localhost:8080/add-accident-route', accident, { headers: headers })
      .pipe(
        tap(data => console.log('createAccidentRoute: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteAccidentTravail(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `accidents-travail/${id}`;
    return this.http.delete<AccidentTravail>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteAccidentTravail: ' + id)),
        catchError(this.handleError)
      );
  }

deleteAccidentCollision(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `accidents-collision/${id}`;
    return this.http.delete<AccidentCollision>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteAccidentCollision: ' + id)),
        catchError(this.handleError)
      );
  }
  deleteAccidentRoute(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `accidents-route/${id}`;
    return this.http.delete<AccidentRoute>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteAccidentRoute: ' + id)),
        catchError(this.handleError)
      );
  }


  getPhoto(id){
return  this.http.get("http://localhost:8088/getPhoto"+id)
.pipe(tap(resp => resp));
  }

  updateAccidentTravail(accident: AccidentTravailDto): Observable<AccidentTravail> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://localhost:8080//update-accident-travail/${accident.id}';
    return this.http.put<AccidentTravail>(url, accident, { headers: headers })
      .pipe(
        tap(() => console.log('updateAccident: ' + accident.id)),
        map(() => accident),
        catchError(this.handleError)
      );
  }

   updateAccidentCollision(accident: AccidentCollisionDto): Observable<AccidentCollision> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://localhost:8080//update-accident-collision/${accident.id}`;
    return this.http.put<AccidentCollision>(url, accident, { headers: headers })
      .pipe(
        tap(() => console.log('updateAccident: ' + accident.id)),
        map(() => accident),
        catchError(this.handleError)
      );
  }

   updateAccidentRoute(accident: AccidentRouteDto): Observable<AccidentRoute> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://localhost:8080//update-accident-route/${accident.id}`;
    return this.http.put<AccidentRoute>(url, accident, { headers: headers })
      .pipe(
        tap(() => console.log('updateAccident: ' + accident.id)),
        map(() => accident),
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

  private initializeAccidentTravail(): AccidentTravail {
    
    return {
     id: 0,
timeAccident:null,
dateAccident:null,
dateSaisi:null,
timeSaisi:null,
dateInfo:null,
timeInfo:null,
description:null,
photo:null,
typeAccTravail:null,
idEmplacement:null,
idAgentPcr:0,
idRecord:0,
idSourceInfo:0,
idDegat:0,
idTransport:0

    };
  }

  private initializeAccidentCollision(): AccidentCollision {
    
    return {
     id: 0,
timeAccident:null,
dateAccident:null,
dateSaisi:null,
timeSaisi:null,
dateInfo:null,
timeInfo:null,
description:null,
photo:null,
idEmplacement:null,
idAgentPcr:0,
idRecord:0,
idSourceInfo:0,
idDegat:0,
idBus:0
    };
  }

  private initializeAccidentRoute(): AccidentRoute {
    
    return {
       id: 0,
timeAccident:null,
dateAccident:null,
dateSaisi:null,
timeSaisi:null,
dateInfo:null,
timeInfo:null,
description:null,
photo:null,
typeAccRoute:null,
idEmplacement:null,
idAgentPcr:0,
idRecord:0,
idSourceInfo:0,
idDegat:0,
idBus:0
    };
    }
  }

