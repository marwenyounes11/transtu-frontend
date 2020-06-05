import { Component, OnInit } from '@angular/core';

import { Chauffeur } from './chauffeur';
import { ChauffeurService } from './chauffeur.service';

@Component({
  templateUrl: './chauffeur-list.component.html',
  styleUrls: ['./chauffeur-list.component.css']
})
export class ChauffeurListComponent implements OnInit {
  pageTitle = 'قائمة السائقين';
  
  errorMessage = '';
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredChauffeurs = this.listFilter ? this.performFilter(this.listFilter) : this.chauffeurs;
  }

  filteredChauffeurs: Chauffeur[] = [];
  chauffeurs: Chauffeur[] = [];

  constructor(private chauffeurService: ChauffeurService) { }


  performFilter(filterBy: string): Chauffeur[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.chauffeurs.filter((chauffeur: Chauffeur) =>
      chauffeur.nameChauffeur.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

 

  ngOnInit(): void {
    this.chauffeurService.getChauffeurs().subscribe(
      chauffeurs => {
        this.chauffeurs = chauffeurs;
        this.filteredChauffeurs = this.chauffeurs;
      },
      error => this.errorMessage = <any>error
    );
  }
}
