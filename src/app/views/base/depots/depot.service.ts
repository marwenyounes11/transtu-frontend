import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { DepotDto } from './depotdto';


@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor(private http: HttpClient) { }

  getDepots(): Observable<DepotDto[]> {
    return this.http.get<DepotDto[]>('http://localhost:8080/list-depot')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
getDepot(id: number): Observable<DepotDto> {
    if (id === 0) {
      return of(this.initializeDepot());
    }
    const url = `http://localhost:8080/depot/{id}`;
    return this.http.get<DepotDto>(url)
      .pipe(
        tap(data => console.log('getDepot: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  

  

  
  createDepot(depot: DepotDto): Observable<DepotDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<DepotDto>('http://localhost:8080/add-depot', depot, { headers: headers })
      .pipe(
        tap(data => console.log('createDepot: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   

  deleteDepot(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `delete-depot/${id}`;
    return this.http.delete<DepotDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteDepot: ' + id)),
        catchError(this.handleError)
      );
  }



  

  updateDepot(depot: DepotDto): Observable<DepotDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://localhost:8080/update-depot/${depot.id}';
    return this.http.put<DepotDto>(url, depot, { headers: headers })
      .pipe(
        tap(() => console.log('updateDepot: ' + depot.id)),
        map(() => depot),
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

  private initializeDepot(): DepotDto {
    
    return {
     id: 0,
     nameDepot:null,
     districtId: 0
    };
  }

  
  }

