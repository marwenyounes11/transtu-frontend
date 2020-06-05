import { Component, OnInit } from '@angular/core';

import { DepotDto } from './depotdto';
import {DepotService } from './depot.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot-list.component.html',
  styleUrls: ['./depot-list.component.css']
})
export class DepotListComponent implements OnInit {
  pageTitle = 'قائمة المستودعات ';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDepot = this.listFilter ? this.performFilter(this.listFilter) : this.depots;
  }

  filteredDepot: DepotDto[] = [];
 depots: DepotDto[] = [];

  constructor(private depotService: DepotService) { }


  performFilter(filterBy: string): DepotDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.depots.filter((depot: DepotDto) =>
      depot.nameDepot.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.depotService.getDepots().subscribe(
      depots => {
        this.depots = depots ;
        this.filteredDepot = this.depots;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
