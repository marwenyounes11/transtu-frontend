import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineDto } from './linedto';
import { LineService } from './line.service';

@Component({
  templateUrl: './line-detail.component.html',
  styleUrls: ['./line-detail.component.css']
})
export class LineDetailComponent implements OnInit {
  pageTitle = 'تفاصيل الخطوط';
  errorMessage = '';
  line: LineDto | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private lineService: LineService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getLine(id);
    }
  }

  getLine(id: number) {
    this.lineService.getLine(id).subscribe(
      line => this.line = line,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/قائمة الخطوط ']);
  }

}
