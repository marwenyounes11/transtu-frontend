import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { AgentPcrDto } from './agentpcrdto';


@Injectable({
  providedIn: 'root'
})
export class AgentPcrService {

  constructor(private http: HttpClient) { }

  getAgentsPcr(): Observable<AgentPcrDto[]> {
    return this.http.get<AgentPcrDto[]>('http://localhost:8080/agentPcr')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
getAgentPcr(id: number): Observable<AgentPcrDto> {
    if (id === 0) {
      return of(this.initializeAgentPcr());
    }
    const url = `http://localhost:8080/agentPcr/{id}`;
    return this.http.get<AgentPcrDto>(url)
      .pipe(
        tap(data => console.log('getAgentPcr: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  

  

  
  createAgentPcr(agentpcr: AgentPcrDto): Observable<AgentPcrDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AgentPcrDto>('http://localhost:8080//add-agentpcr', agentpcr, { headers: headers })
      .pipe(
        tap(data => console.log('createAgentPcr: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   

  deleteAgentPcr(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `delete-agentPcr/${id}`;
    return this.http.delete<AgentPcrDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteAgentPcr: ' + id)),
        catchError(this.handleError)
      );
  }



  

  updateAgentPcr(agentpcr: AgentPcrDto): Observable<AgentPcrDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://localhost:8080//update-agentPcr/${agentpcr.id}';
    return this.http.put<AgentPcrDto>(url, agentpcr, { headers: headers })
      .pipe(
        tap(() => console.log('updateAgentPcr: ' + agentpcr.id)),
        map(() => agentpcr),
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

  private initializeAgentPcr(): AgentPcrDto {
    
    return {
     id: 0,
    nameAgent :null,
     lastNameAgent:null,
     phoneAgent:null
    };
  }

  
  }

