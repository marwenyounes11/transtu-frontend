import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { DistrictDto } from './districtdto';


@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private http: HttpClient) { }

  getDistricts(): Observable<DistrictDto[]> {
    return this.http.get<DistrictDto[]>('http://localhost:8080/district')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
getDistrict(id: number): Observable<DistrictDto> {
    if (id === 0) {
      return of(this.initializeDistrict());
    }
    const url = `http://localhost:8080/district/{id}`;
    return this.http.get<DistrictDto>(url)
      .pipe(
        tap(data => console.log('getDistrict: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  

  

  
  createDistrict(district: DistrictDto): Observable<DistrictDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<DistrictDto>('http://localhost:8080/add-district', district, { headers: headers })
      .pipe(
        tap(data => console.log('createDistrict: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   

  deleteDistrict(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `delete-district/${id}`;
    return this.http.delete<DistrictDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteDistrict: ' + id)),
        catchError(this.handleError)
      );
  }



  

  updateDistrict(district: DistrictDto): Observable<DistrictDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://localhost:8080/update-district/${district.id}';
    return this.http.put<DistrictDto>(url, district, { headers: headers })
      .pipe(
        tap(() => console.log('updateDistrict: ' + district.id)),
        map(() => district),
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

  private initializeDistrict(): DistrictDto {
    
    return {
     id: 0,
     aliasDistrict:null,
     nameDistrict: null
    };
  }

  
  }

