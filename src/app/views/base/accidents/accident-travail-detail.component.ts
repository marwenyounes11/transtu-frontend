import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AccidentTravail } from './accidenttravail';
import { AccidentService } from './accident.service';

@Component({
  templateUrl: './accident-travail-detail.component.html',
  styleUrls: ['./accident-travail-detail.component.css']
})
export class AccidentTravailDetailComponent implements OnInit {
  pageTitle = 'Accident Travail Detail';
  errorMessage = '';
  accident: AccidentTravail | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private accidentService: AccidentService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getAccidentTravail(id);
    }
  }

  getAccidentTravail(id: number) {
    this.accidentService.getAccidentTravail(id).subscribe(
      accident => this.accident = accident,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/accidentstravail']);
  }

}
