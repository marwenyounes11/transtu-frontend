import { Component, OnInit } from '@angular/core';

import { DepartementDto } from './departementdto';
import {DepartementService } from './departement.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement-list.component.html',
  styleUrls: ['./departement-list.component.css']
})
export class DepartementListComponent implements OnInit {
  pageTitle = 'قائمة المباني ';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDepartement = this.listFilter ? this.performFilter(this.listFilter) : this.departements;
  }

  filteredDepartement: DepartementDto[] = [];
 departements: DepartementDto[] = [];

  constructor(private departementService: DepartementService) { }


  performFilter(filterBy: string): DepartementDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.departements.filter((departement: DepartementDto) =>
      departement.nameDept.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.departementService.getDepartements().subscribe(
      departements => {
        this.departements = departements ;
        this.filteredDepartement = this.departements;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
