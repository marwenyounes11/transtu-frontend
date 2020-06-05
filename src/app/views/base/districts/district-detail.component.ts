import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DistrictDto } from './districtdto';
import { DistrictService } from './district.service';

@Component({
  templateUrl: './district-detail.component.html',
  styleUrls: ['./district-detail.component.css']
})
export class DistrictDetailComponent implements OnInit {
  pageTitle = 'تفاصيل الخطوط';
  errorMessage = '';
  district: DistrictDto | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private districtService: DistrictService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getDistrict(id);
    }
  }

  getDistrict(id: number) {
    this.districtService.getDistrict(id).subscribe(
      district => this.district = district,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/تفاصيل  الاقاليم ']);
  }

}
