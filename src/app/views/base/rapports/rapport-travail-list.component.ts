import { Component, OnInit } from '@angular/core';

import { RapportTravailDto } from './rapporttravaildto';
import { RapportService } from './rapport.service';

@Component({
  selector: 'app-rapportTravail',
  templateUrl: './rapport-travail-list.component.html',
  styleUrls: ['./rapport-travail-list.component.css']
})
export class RapportTravailListComponent implements OnInit {
  pageTitle = 'جدول الاعتداءات لحوادث الشغل';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredRapportTravail = this.listFilter ? this.performFilter(this.listFilter) : this.rapports;
  }

  filteredRapportTravail: RapportTravailDto[] = [];
 rapports: RapportTravailDto[] = [];

  constructor(private rapportService: RapportService) { }


  performFilter(filterBy: string): RapportTravailDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.rapports.filter((rapport: RapportTravailDto) =>
      rapport.descriptionDegat.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.rapportService.getRapportsTravail().subscribe(
      rapports => {
        this.rapports = rapports;
        this.filteredRapportTravail = this.rapports;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
