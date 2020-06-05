import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Transport } from './transport';
import { TransportDto } from './transportdto';
import { Bus } from './bus';
import { BusDto } from './busdto';
import { Metro } from './metro';
import { MetroDto } from './metrodto';
import { Train } from './train';
import { TrainDto } from './traindto';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private busUrl = 'http://localhost:8080/bus';
  private metroUrl = 'http://localhost:8080/metro';
  private trainUrl = 'http://localhost:8080/train';
   private transportUrl = 'http://localhost:8080/transport';
  constructor(private http: HttpClient) { }
 getTransports(): Observable<TransportDto[]> {
    return this.http.get<TransportDto[]>(this.transportUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getBuss(): Observable<BusDto[]> {
    return this.http.get<BusDto[]>(this.busUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

 getMetros(): Observable<MetroDto[]> {
    return this.http.get<MetroDto[]>(this.metroUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

getTrains(): Observable<TrainDto[]> {
    return this.http.get<TrainDto[]>(this.trainUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getBus(id: number): Observable<Bus> {
    if (id === 0) {
      return of(this.initializeBus());
    }
    const url = `${this.busUrl}/${id}`;
    return this.http.get<Bus>(url)
      .pipe(
        tap(data => console.log('getBus: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getMetro(id: number): Observable<Metro> {
    if (id === 0) {
      return of(this.initializeMetro());
    }
    const url = `${this.metroUrl}/${id}`;
    return this.http.get<Metro>(url)
      .pipe(
        tap(data => console.log('getMetro: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

getTrain(id: number): Observable<Train> {
    if (id === 0) {
      return of(this.initializeTrain());
    }
    const url = `${this.trainUrl}/${id}`;
    return this.http.get<Train>(url)
      .pipe(
        tap(data => console.log('getTrain: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createBus(bus: BusDto): Observable<BusDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    bus.id = null;
    return this.http.post<BusDto>('http://localhost:8080/add-bus', bus, { headers: headers })
      .pipe(
        tap(data => console.log('createBus: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

 createMetro(metro: MetroDto): Observable<MetroDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    metro.id = null;
    return this.http.post<MetroDto>('http://localhost:8080/add-metro', metro, { headers: headers })
      .pipe(
        tap(data => console.log('createMetro: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

   createTrain(train: TrainDto): Observable<TrainDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    train.id = null;
    return this.http.post<TrainDto>('http://localhost:8080/add-train', train, { headers: headers })
      .pipe(
        tap(data => console.log('createTrain: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteBus(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.busUrl}/${id}`;
    return this.http.delete<BusDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteBus: ' + id)),
        catchError(this.handleError)
      );
  }

  deleteMetro(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.metroUrl}/${id}`;
    return this.http.delete<MetroDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteMetro: ' + id)),
        catchError(this.handleError)
      );
  }

  deleteTrain(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.trainUrl}/${id}`;
    return this.http.delete<TrainDto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteTrain: ' + id)),
        catchError(this.handleError)
      );
  }

  updateBus(bus: BusDto): Observable<BusDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.busUrl}/${bus.id}`;
    return this.http.put<BusDto>(url, bus, { headers: headers })
      .pipe(
        tap(() => console.log('updateBus: ' + bus.id)),
        map(() => bus),
        catchError(this.handleError)
      );
  }

 updateMetro(metro: MetroDto): Observable<MetroDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.metroUrl}/${metro.id}`;
    return this.http.put<MetroDto>(url, metro, { headers: headers })
      .pipe(
        tap(() => console.log('updateMetro: ' + metro.id)),
        map(() => metro),
        catchError(this.handleError)
      );
  }

updateTrain(train: TrainDto): Observable<TrainDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.trainUrl}/${train.id}`;
    return this.http.put<TrainDto>(url, train, { headers: headers })
      .pipe(
        tap(() => console.log('updateTrain: ' + train.id)),
        map(() => train),
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

  private initializeBus(): Bus {
    
     return {
     id:0,
     numTransport: null,
     immatriculation: null,
     marque: null,
     model: null,
     gabarit: null,
     idDistrict: 0,
    idLine: 0,
    idAccident: 0,
    idChauffeur: 0,
    idReceveur: 0,
     idDegatMateriel: 0
    };
  }

   private initializeMetro(): Metro {
    
     return {
     id:0,
    numTransport: null,
     immatriculation: null,
     marque: null,
     model: null,
     gabarit: null,
     idDistrict: 0,
    idLine: 0,
    idAccident: 0,
    idChauffeur: 0,
    idDegatMateriel: 0,
    };
  }

   private initializeTrain(): Train {
    
     return {
     id:0,
    numTransport: null,
     immatriculation: null,
     marque: null,
     model: null,
     gabarit: null,
     idDistrict: 0,
    idLine: 0,
    idAccident: 0,
    idChauffeur: 0,
    idDegatMateriel: 0,
    };
  }
}
