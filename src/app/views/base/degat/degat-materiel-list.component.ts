import { Component, OnInit } from '@angular/core';

import { DegatMaterielDto } from './degatmaterieldto';
import {DegatService } from './degat.service';

@Component({
  selector: 'app-DegatMateriel',
  templateUrl: './degat-materiel-list.component.html',
  styleUrls: ['./degat-materiel-list.component.css']
})
export class DegatMaterielListComponent implements OnInit {
  pageTitle = 'قائمة الاضرار  المادية ';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDegatMateriel = this.listFilter ? this.performFilter(this.listFilter) : this.degatsmateriel;
  }

  filteredDegatMateriel: DegatMaterielDto[] = [];
 degatsmateriel: DegatMaterielDto[] = [];

  constructor(private degatService: DegatService) { }


  performFilter(filterBy: string): DegatMaterielDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.degatsmateriel.filter((degatmateriel: DegatMaterielDto) =>
      degatmateriel.descriptionDegat.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.degatService.getDegatsMateriel().subscribe(
      degatsmateriel => {
        this.degatsmateriel = degatsmateriel ;
        this.filteredDegatMateriel = this.degatsmateriel;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
