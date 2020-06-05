import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AccidentCollision } from './accidentcollision';
import { AccidentService } from './accident.service';

@Component({
  templateUrl: './accident-collision-detail.component.html',
  styleUrls: ['./accident-collision-detail.component.css']
})
export class AccidentCollisionDetailComponent implements OnInit {
  pageTitle = 'Accident Collision Detail';
  errorMessage = '';
  accident: AccidentCollision | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private accidentService: AccidentService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getAccidentCollision(id);
    }
  }

  getAccidentCollision(id: number) {
    this.accidentService.getAccidentCollision(id).subscribe(
      accident => this.accident = accident,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/accidentscollision']);
  }

}
