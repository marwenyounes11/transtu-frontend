import { Component, OnInit } from '@angular/core';

import { VictimeDto } from './victimedto';
import {VictimeService } from './victime.service';

@Component({
  selector: 'app-victime',
  templateUrl: './victime-list.component.html',
  styleUrls: ['./victime-list.component.css']
})
export class VictimeListComponent implements OnInit {
  pageTitle = 'ققائمة  الضحايا  ';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredVictime = this.listFilter ? this.performFilter(this.listFilter) : this.victimes;
  }

  filteredVictime: VictimeDto[] = [];
 victimes: VictimeDto[] = [];

  constructor(private victimeService: VictimeService) { }


  performFilter(filterBy: string): VictimeDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.victimes.filter((victime: VictimeDto) =>
      victime.nameVictime.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.victimeService.getVictimes().subscribe(
      victimes => {
        this.victimes = victimes ;
        this.filteredVictime = this.victimes;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
