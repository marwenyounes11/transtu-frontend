import { Component, OnInit } from '@angular/core';

import { EmplacementDto } from './emplacementdto';
import {EmplacementService } from './emplacement.service';

@Component({
  selector: 'app-emplacement',
  templateUrl: './emplacement-list.component.html',
  styleUrls: ['./emplacement-list.component.css']
})
export class EmplacementListComponent implements OnInit {
  pageTitle = 'قائمة المواقع';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredEmplacement = this.listFilter ? this.performFilter(this.listFilter) : this.emplacements;
  }

  filteredEmplacement: EmplacementDto[] = [];
 emplacements: EmplacementDto[] = [];

  constructor(private emplacementService: EmplacementService) { }


  performFilter(filterBy: string): EmplacementDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.emplacements.filter((emplacement: EmplacementDto) =>
      emplacement.delegation.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.emplacementService.getEmplacements().subscribe(
      emplacements => {
        this.emplacements = emplacements ;
        this.filteredEmplacement = this.emplacements;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
