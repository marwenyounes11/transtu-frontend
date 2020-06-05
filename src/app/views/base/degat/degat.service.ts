import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { DegatMaterielDto } from './degatmaterieldto';
import { DegatPhysiqueDto } from './degatphysiquedto';
import { DegatDto } from './degatdto';

@Injectable({
  providedIn: 'root'
})
export class DegatService {

  constructor(private http: HttpClient) { }
  getDegats(): Observable<DegatDto[]> {
    return this.http.get<DegatDto[]>('http://localhost:8080/degat')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getDegatsPhysique(): Observable<DegatPhysiqueDto[]> {
    return this.http.get<DegatPhysiqueDto[]>('http://localhost:8080/list-degat-physique')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getDegatsMateriel(): Observable<DegatMaterielDto[]> {
    return this.http.get<DegatMaterielDto[]>('http://localhost:8080/list-degat-materiel')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
getDegatPhysique(id: number): Observable<DegatPhysiqueDto> {
    if (id === 0) {
      return of(this.initializeDegatPhysique());
    }
    const url = `http://localhost:8080/degat-physique/{id}`;
    return this.http.get<DegatPhysiqueDto>(url)
      .pipe(
        tap(data => console.log('getDegatPhysique: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  
  getDegatMateriel(id: number): Observable<DegatMaterielDto> {
    if (id === 0) {
      return of(this.initializeDegatMateriel());
    }
    const url = `http://localhost:8080/degat-materiel/{id}`;
    return this.http.get<DegatMaterielDto>(url)
      .pipe(
        tap(data => console.log('getDegatMateriel: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  

  

  
  createDegatMateriel(degatmateriel: DegatMaterielDto): Observable<DegatMaterielDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<DegatMaterielDto>('http://localhost:8080//add-degat-materiel', degatmateriel, { headers: headers })
      .pipe(
        tap(data => console.log('createDegatMateriel: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createDegatPhysique(degatphysique: DegatPhysiqueDto): Observable<DegatPhysiqueDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<DegatPhysiqueDto>('http://localhost:8080//add-degat-physique', degatphysique, { headers: headers })
      .pipe(
        tap(data => console.log('createDegatPhysique: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   

  deleteDegatPhysique(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `delete-degatphysique/${id}`;
    return this.http.delete<DegatPhysiqueDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteDegatPhysique: ' + id)),
        catchError(this.handleError)
      );
  }

deleteDegatMateriel(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `delete-degatmateriel/${id}`;
    return this.http.delete<DegatMaterielDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteDegatMateriel: ' + id)),
        catchError(this.handleError)
      );
  }



  

  updateDegatPhysique(degatphysique: DegatPhysiqueDto): Observable<DegatPhysiqueDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://localhost:8080//update-degat-physique/${degatphysique.id}';
    return this.http.put<DegatPhysiqueDto>(url, degatphysique, { headers: headers })
      .pipe(
        tap(() => console.log('updateDegatPhysique: ' + degatphysique.id)),
        map(() => degatphysique),
        catchError(this.handleError)
      );
  }

 updateDegatMateriel(degatmateriel: DegatMaterielDto): Observable<DegatMaterielDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://localhost:8080//update-degatmateriel/${degatmateriel.id}';
    return this.http.put<DegatMaterielDto>(url, degatmateriel, { headers: headers })
      .pipe(
        tap(() => console.log('updateDegatMateriel: ' + degatmateriel.id)),
        map(() => degatmateriel),
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

  private initializeDegatPhysique(): DegatPhysiqueDto {
    
    return {
     id: 0,
     descriptionDegat:null,
     estimationPrixDegat:null,
     idAccident: 0
    };
  }

   private initializeDegatMateriel(): DegatMaterielDto {
    
    return {
      id: 0,
     descriptionDegat:null,
     estimationPrixDegat:null,
     idAccident: 0
    };
  }

  }

