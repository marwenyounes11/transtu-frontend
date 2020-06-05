import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { DepartementDto } from './departementdto';


@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  constructor(private http: HttpClient) { }

  getDepartements(): Observable<DepartementDto[]> {
    return this.http.get<DepartementDto[]>('http://localhost:8080/departement')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
getDepartement(id: number): Observable<DepartementDto> {
    if (id === 0) {
      return of(this.initializeDepartement());
    }
    const url = `http://localhost:8080/departement/{id}`;
    return this.http.get<DepartementDto>(url)
      .pipe(
        tap(data => console.log('getDepartement: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  

  

  
  createDepartement(departement: DepartementDto): Observable<DepartementDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<DepartementDto>('http://localhost:8080/add-departement', departement, { headers: headers })
      .pipe(
        tap(data => console.log('createDepartement: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   

  deleteDepartement(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `delete-departement/${id}`;
    return this.http.delete<DepartementDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteDepartement: ' + id)),
        catchError(this.handleError)
      );
  }



  

  updateDepartement(departement: DepartementDto): Observable<DepartementDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://localhost:8080/update-departement/${departement.id}';
    return this.http.put<DepartementDto>(url, departement, { headers: headers })
      .pipe(
        tap(() => console.log('updateDepartement: ' + departement.id)),
        map(() => departement),
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

  private initializeDepartement(): DepartementDto {
    
    return {
     id: 0,
     nameDept:null
    };
  }

  
  }

