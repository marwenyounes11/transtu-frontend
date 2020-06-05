import { Component, OnInit } from '@angular/core';

import { ReceveurDto } from './receveurdto';
import {ReceveurService } from './receveur.service';

@Component({
  selector: 'app-receveur',
  templateUrl: './receveur-list.component.html',
  styleUrls: ['./receveur-list.component.css']
})
export class ReceveurListComponent implements OnInit {
  pageTitle = 'قائمة القباض ';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredReceveur = this.listFilter ? this.performFilter(this.listFilter) : this.receveurs;
  }

  filteredReceveur: ReceveurDto[] = [];
 receveurs: ReceveurDto[] = [];

  constructor(private receveurService: ReceveurService) { }


  performFilter(filterBy: string): ReceveurDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.receveurs.filter((receveur: ReceveurDto) =>
      receveur.nameReceveur.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.receveurService.getReceveurs().subscribe(
      receveurs => {
        this.receveurs = receveurs ;
        this.filteredReceveur = this.receveurs;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
