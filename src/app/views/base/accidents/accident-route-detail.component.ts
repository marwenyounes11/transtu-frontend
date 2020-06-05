import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AccidentRoute } from './accidentroute';
import { AccidentService } from './accident.service';

@Component({
  templateUrl: './accident-route-detail.component.html',
  styleUrls: ['./accident-route-detail.component.css']
})
export class AccidentRouteDetailComponent implements OnInit {
  pageTitle = 'Accident Route Detail';
  errorMessage = '';
  accident: AccidentRoute | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private accidentService: AccidentService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getAccidentRoute(id);
    }
  }

  getAccidentRoute(id: number) {
    this.accidentService.getAccidentRoute(id).subscribe(
      accident => this.accident = accident,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/accidentsroute']);
  }

}
