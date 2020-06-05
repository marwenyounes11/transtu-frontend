import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SourceInfoDto } from './sourceinfodto';
import { SourceInfoService } from './sourceinfo.service';

@Component({
  templateUrl: './source-info-detail.component.html',
  styleUrls: ['./source-info-detail.component.css']
})
export class SourceInfoDetailComponent implements OnInit {
  pageTitle = 'تفاصيل عامل  القاعة ';
  errorMessage = '';
  sourceinfo: SourceInfoDto | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private sourceinfoService: SourceInfoService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getSourceInfo(id);
    }
  }

  getSourceInfo(id: number) {
    this.sourceinfoService.getSourceInfo(id).subscribe(
      sourceinfo => this.sourceinfo = sourceinfo,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/قائمة مصدر الاعلام']);
  }

}
