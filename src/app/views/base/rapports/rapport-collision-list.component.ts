import { Component, OnInit } from '@angular/core';

import { RapportDto } from './rapportdto';
import { RapportService } from './rapport.service';

@Component({
  selector: 'app-rapportCollision',
  templateUrl: './rapport-collision-list.component.html',
  styleUrls: ['./rapport-collision-list.component.css']
})
export class RapportCollisionListComponent implements OnInit {
  pageTitle = 'جدول الاعتداءات لحوادث الجولان';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredRapportCollision = this.listFilter ? this.performFilter(this.listFilter) : this.rapports;
  }

  filteredRapportCollision: RapportDto[] = [];
 rapports: RapportDto[] = [];

  constructor(private rapportService: RapportService) { }


  performFilter(filterBy: string): RapportDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.rapports.filter((rapport: RapportDto) =>
      rapport. descriptionDegat.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.rapportService.getRapportsCollision().subscribe(
      rapports => {
        this.rapports = rapports;
        this.filteredRapportCollision = this.rapports;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
