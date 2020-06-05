import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { VictimeDto } from './victimedto';
import { VictimeService } from './victime.service';

@Component({
  templateUrl: './victime-detail.component.html',
  styleUrls: ['./victime-detail.component.css']
})
export class VictimeDetailComponent implements OnInit {
  pageTitle = 'تفاصيل الضحايا ';
  errorMessage = '';
  victime: VictimeDto | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private victimeService: VictimeService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getVictime(id);
    }
  }

  getVictime(id: number) {
    this.victimeService.getVictime(id).subscribe(
      victime => this.victime = victime,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/قائمة  الضحايا  ']);
  }

}
