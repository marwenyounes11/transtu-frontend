import { Component, OnInit } from '@angular/core';

import { RecordDto } from './recorddto';
import {RecordService } from './record.service';

@Component({
  selector: 'app-record',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  pageTitle = 'قائمة المحاضر';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredRecord = this.listFilter ? this.performFilter(this.listFilter) : this.records;
  }

  filteredRecord: RecordDto[] = [];
 records: RecordDto[] = [];

  constructor(private recordService: RecordService) { }


  performFilter(filterBy: string): RecordDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.records.filter((record: RecordDto) =>
      record.descriptionRecord.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.recordService.getRecords().subscribe(
      records => {
        this.records = records ;
        this.filteredRecord = this.records;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
