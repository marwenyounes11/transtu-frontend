import { Component, OnInit } from '@angular/core';

import { AccidentRoute } from './accidentroute';
import { AccidentService } from './accident.service';

@Component({
  selector: 'app-accidentRoute',
  templateUrl: './accident-route-list.component.html',
  styleUrls: ['./accident-route-list.component.css']
})
export class AccidentRouteListComponent implements OnInit {
  pageTitle = 'قائمة حوادث الطريق';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredAccidentRoute = this.listFilter ? this.performFilter(this.listFilter) : this.accidents;
  }

  filteredAccidentRoute: AccidentRoute[] = [];
 accidents: AccidentRoute[] = [];

  constructor(private accidentService: AccidentService) { }


  performFilter(filterBy: string): AccidentRoute[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.accidents.filter((accident: AccidentRoute) =>
      accident.description.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.accidentService.getAccidentsRoute().subscribe(
      accidents => {
        this.accidents = accidents;
        this.filteredAccidentRoute = this.accidents;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
