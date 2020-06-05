import { Component, OnInit } from '@angular/core';

import { AccidentCollision } from './accidentcollision';
import { AccidentService } from './accident.service';

@Component({
  selector: 'app-accident',
  templateUrl: './accident-collision-list.component.html',
  styleUrls: ['./accident-collision-list.component.css']
})
export class AccidentCollisionListComponent implements OnInit {
  pageTitle = 'قائمة حوادث المرور ';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredAccidentCollision = this.listFilter ? this.performFilter(this.listFilter) : this.accidents;
  }

  filteredAccidentCollision: AccidentCollision[] = [];
 accidents: AccidentCollision[] = [];

  constructor(private accidentService: AccidentService) { }


  performFilter(filterBy: string): AccidentCollision[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.accidents.filter((accident: AccidentCollision) =>
      accident.description.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.accidentService.getAccidentsCollision().subscribe(
      accidents => {
        this.accidents = accidents;
        this.filteredAccidentCollision = this.accidents;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
