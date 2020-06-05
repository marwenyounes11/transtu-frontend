import { Component, OnInit } from '@angular/core';

import { LineDto } from './linedto';
import {LineService } from './line.service';

@Component({
  selector: 'app-line',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css']
})
export class LineListComponent implements OnInit {
  pageTitle = 'قائمة الخطوط  ';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredLine = this.listFilter ? this.performFilter(this.listFilter) : this.lines;
  }

  filteredLine: LineDto[] = [];
 lines: LineDto[] = [];

  constructor(private lineService: LineService) { }


  performFilter(filterBy: string): LineDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.lines.filter((line: LineDto) =>
      line.nameLine.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.lineService.getLines().subscribe(
      lines => {
        this.lines = lines ;
        this.filteredLine = this.lines;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
