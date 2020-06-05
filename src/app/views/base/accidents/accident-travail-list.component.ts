import { Component, OnInit } from '@angular/core';

import { AccidentTravail } from './accidenttravail';
import { AccidentService } from './accident.service';

@Component({
  selector: 'app-accidentTravail',
  templateUrl: './accident-travail-list.component.html',
  styleUrls: ['./accident-travail-list.component.css']
})
export class AccidentTravailListComponent implements OnInit {
  pageTitle = 'قائمة حوادث الشغل';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredAccidentTravail = this.listFilter ? this.performFilter(this.listFilter) : this.accidents;
  }

  filteredAccidentTravail: AccidentTravail[] = [];
 accidents: AccidentTravail[] = [];

  constructor(private accidentService: AccidentService) { }


  performFilter(filterBy: string): AccidentTravail[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.accidents.filter((accident: AccidentTravail) =>
      accident.description.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.accidentService.getAccidentsTravail().subscribe(
      accidents => {
        this.accidents = accidents;
        this.filteredAccidentTravail = this.accidents;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
