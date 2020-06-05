import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Chauffeur } from './chauffeur';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {
  private chauffeurUrl = 'http://localhost:8080/chauffeur';

  constructor(private http: HttpClient) { }

  getChauffeurs(): Observable<Chauffeur[]> {
    return this.http.get<Chauffeur[]>(this.chauffeurUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getChauffeur(id: number): Observable<Chauffeur> {
    if (id === 0) {
      return of(this.initializeChauffeur());
    }
    const url = `${this.chauffeurUrl}/${id}`;
    return this.http.get<Chauffeur>(url)
      .pipe(
        tap(data => console.log('getChauffeur: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createChauffeur(chauffeur: Chauffeur): Observable<Chauffeur> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  chauffeur.id = null;
    return this.http.post<Chauffeur>(this.chauffeurUrl, chauffeur, { headers: headers })
      .pipe(
        tap(data => console.log('createChauffeur: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteChauffeur(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.chauffeurUrl}/${id}`;
    return this.http.delete<Chauffeur>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteChauffeur: ' + id)),
        catchError(this.handleError)
      );
  }

  updateChauffeur(chauffeur: Chauffeur): Observable<Chauffeur> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://localhost:8080/update-chauffeur/${chauffeur.id}`;
    return this.http.put<Chauffeur>(url, chauffeur, { headers: headers })
      .pipe(
        tap(() => console.log('updateChauffeur: ' + chauffeur.id)),
        // Return the Chauffeur on an update
        map(() => chauffeur),
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

  private initializeChauffeur(): Chauffeur {
    
    return {
id: 0,
      addressChauffeur :null,
      cityChauffeur :null,
      emailChauffeur :null,
    lastNameChauffeur :null,
    nameChauffeur :null,
    phoneChauffeur :null
    };
  }
}
