import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Bus } from './bus';
import { TransportService } from './transport.service';

@Component({
  templateUrl: './bus-detail.component.html',
  styleUrls: ['./bus-detail.component.css']
})
export class BusDetailComponent implements OnInit {
  pageTitle = 'Bus Detail';
  errorMessage = '';
  bus: Bus | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private transportService: TransportService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getBus(id);
    }
  }

  getBus(id: number) {
    this.transportService.getBus(id).subscribe(
      bus => this.bus = bus,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/bus']);
  }

}
