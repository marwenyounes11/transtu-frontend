import { Component, OnInit } from '@angular/core';

import { DistrictDto } from './districtdto';
import {DistrictService } from './district.service';

@Component({
  selector: 'app-district',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.css']
})
export class DistrictListComponent implements OnInit {
  pageTitle = 'قائمة الاقاليم ';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDistrict = this.listFilter ? this.performFilter(this.listFilter) : this.districts;
  }

  filteredDistrict: DistrictDto[] = [];
 districts: DistrictDto[] = [];

  constructor(private districtService: DistrictService) { }


  performFilter(filterBy: string): DistrictDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.districts.filter((district: DistrictDto) =>
      district.nameDistrict.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.districtService.getDistricts().subscribe(
      districts => {
        this.districts = districts ;
        this.filteredDistrict = this.districts;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
