import { Component, OnInit } from '@angular/core';

import { Bus} from './bus';
import { BusDto} from './busdto';
import { TransportService } from './transport.service';

@Component({
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
export class BusListComponent implements OnInit {
  pageTitle = 'قائمة الحافلات';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredBus = this.listFilter ? this.performFilter(this.listFilter) : this.bus;
  }

  filteredBus: BusDto[] = [];
 bus: BusDto[] = [];

  constructor(private transportService: TransportService) { }


  performFilter(filterBy: string): BusDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.bus.filter((bus: BusDto) =>
      bus.numTransport.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.transportService.getBuss().subscribe(
     bus => {
        this.bus = bus;
        this.filteredBus = this.bus;
      },
      error => this.errorMessage = <any>error
    );
  }
}
