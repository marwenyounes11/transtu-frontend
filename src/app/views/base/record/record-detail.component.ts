import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecordDto } from './recorddto';
import { RecordService } from './record.service';

@Component({
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent implements OnInit {
  pageTitle = 'تفاصيل عامل  القاعة ';
  errorMessage = '';
  record: RecordDto | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private recordService: RecordService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getRecord(id);
    }
  }

  getRecord(id: number) {
    this.recordService.getRecord(id).subscribe(
      record => this.record = record,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/قائمة المحاضر ']);
  }

}
