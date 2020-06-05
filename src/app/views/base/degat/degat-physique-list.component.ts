import { Component, OnInit } from '@angular/core';

import { DegatPhysiqueDto } from './degatphysiquedto';
import {DegatService } from './degat.service';

@Component({
  selector: 'app-DegatPhysique',
  templateUrl: './degat-physique-list.component.html',
  styleUrls: ['./degat-physique-list.component.css']
})
export class DegatPhysiqueListComponent implements OnInit {
  pageTitle = 'قائمة الاضرار  الجسدية ';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDegatPhysique = this.listFilter ? this.performFilter(this.listFilter) : this.degatsphysique;
  }

  filteredDegatPhysique: DegatPhysiqueDto[] = [];
 degatsphysique: DegatPhysiqueDto[] = [];

  constructor(private degatService: DegatService) { }


  performFilter(filterBy: string): DegatPhysiqueDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.degatsphysique.filter((degatphysique: DegatPhysiqueDto) =>
      degatphysique.descriptionDegat.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.degatService.getDegatsPhysique().subscribe(
      degatsphysique => {
        this.degatsphysique = degatsphysique ;
        this.filteredDegatPhysique = this.degatsphysique;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
