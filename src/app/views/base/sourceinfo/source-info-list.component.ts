import { Component, OnInit } from '@angular/core';
import { SourceInfoDto } from './sourceinfodto';
import {SourceInfoService } from './sourceinfo.service';

@Component({
  selector: 'app-sourceinfo',
  templateUrl: './source-info-list.component.html',
  styleUrls: ['./source-info-list.component.css']
})
export class SourceInfoListComponent implements OnInit {
  pageTitle = 'ققائمة مصدر الاعلام';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredSourceInfo = this.listFilter ? this.performFilter(this.listFilter) : this.sourcesinfo;
  }

  filteredSourceInfo: SourceInfoDto[] = [];
 sourcesinfo: SourceInfoDto[] = [];

  constructor(private sourceInfoService: SourceInfoService) { }


  performFilter(filterBy: string): SourceInfoDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.sourcesinfo.filter((sourceinfo: SourceInfoDto) =>
      sourceinfo.nameInfo.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.sourceInfoService.getSourcesInfo().subscribe(
      sourcesinfo => {
        this.sourcesinfo = sourcesinfo ;
        this.filteredSourceInfo = this.sourcesinfo;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
