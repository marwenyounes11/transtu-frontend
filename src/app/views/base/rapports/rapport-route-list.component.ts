import { Component, OnInit } from '@angular/core';

import { RapportDto } from './rapportdto';
import { RapportService } from './rapport.service';

@Component({
  selector: 'app-rapportRoute',
  templateUrl: './rapport-route-list.component.html',
  styleUrls: ['./rapport-route-list.component.css']
})
export class RapportRouteListComponent implements OnInit {
  pageTitle = 'جدول الاعتداءات لحوادث الطريق';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredRapportRoute = this.listFilter ? this.performFilter(this.listFilter) : this.rapports;
  }

  filteredRapportRoute: RapportDto[] = [];
 rapports: RapportDto[] = [];

  constructor(private rapportService: RapportService) { }


  performFilter(filterBy: string): RapportDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.rapports.filter((rapport: RapportDto) =>
      rapport.descriptionDegat.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.rapportService.getRapportsRoute().subscribe(
      rapports => {
        this.rapports = rapports;
        this.filteredRapportRoute = this.rapports;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
