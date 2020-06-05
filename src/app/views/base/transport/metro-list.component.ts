import { Component, OnInit } from '@angular/core';

import { Metro} from './metro';
import { MetroDto} from './metrodto';
import { TransportService } from './transport.service';

@Component({
  templateUrl: './metro-list.component.html',
  styleUrls: ['./metro-list.component.css']
})
export class MetroListComponent implements OnInit {
  pageTitle = 'قائمة المترو';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredMetro = this.listFilter ? this.performFilter(this.listFilter) : this.metro;
  }

  filteredMetro: MetroDto[] = [];
 metro: MetroDto[] = [];

  constructor(private transportService: TransportService) { }


  performFilter(filterBy: string): MetroDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.metro.filter((metro: MetroDto) =>
      metro.numTransport.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.transportService.getMetros().subscribe(
     metro => {
        this.metro = metro;
        this.filteredMetro = this.metro;
      },
      error => this.errorMessage = <any>error
    );
  }
}
