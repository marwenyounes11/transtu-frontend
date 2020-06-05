import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { SourceInfoDto } from './sourceinfodto';


@Injectable({
  providedIn: 'root'
})
export class SourceInfoService {

  constructor(private http: HttpClient) { }

  getSourcesInfo(): Observable<SourceInfoDto[]> {
    return this.http.get<SourceInfoDto[]>('http://localhost:8080/sourceInfo')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
getSourceInfo(id: number): Observable<SourceInfoDto> {
    if (id === 0) {
      return of(this.initializeSourceInfo());
    }
    const url = `http://localhost:8080/sourceInfo/{id}`;
    return this.http.get<SourceInfoDto>(url)
      .pipe(
        tap(data => console.log('getSourceInfo: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  

  

  
  createSourceInfo(sourceinfo: SourceInfoDto): Observable<SourceInfoDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SourceInfoDto>('http://localhost:8080//add-sourceInfo', sourceinfo, { headers: headers })
      .pipe(
        tap(data => console.log('createSourceInfo: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   

  deleteSourceInfo(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `delete-sourceInfo/${id}`;
    return this.http.delete<SourceInfoDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteSourceInfo: ' + id)),
        catchError(this.handleError)
      );
  }



  

  updateSourceInfo(sourceinfo: SourceInfoDto): Observable<SourceInfoDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://localhost:8080//update-update-sourceInfo/${update-sourceinfo.id}';
    return this.http.put<SourceInfoDto>(url, sourceinfo, { headers: headers })
      .pipe(
        tap(() => console.log('updateSourceInfo: ' + sourceinfo.id)),
        map(() => sourceinfo),
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

  private initializeSourceInfo(): SourceInfoDto {
    
    return {
     id: 0,
    nameInfo :null,
     lastNameInfo:null,
     natureInfo:null,
     phoneInfo:null
    };
  }

  
  }

