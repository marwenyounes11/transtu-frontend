import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepotDto } from './depotdto';
import { DepotService } from './depot.service';

@Component({
  templateUrl: './depot-detail.component.html',
  styleUrls: ['./depot-detail.component.css']
})
export class DepotDetailComponent implements OnInit {
  pageTitle = 'تفاصيل المستودعات';
  errorMessage = '';
  depot: DepotDto | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private depotService: DepotService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getDepot(id);
    }
  }

  getDepot(id: number) {
    this.depotService.getDepot(id).subscribe(
      depot => this.depot = depot,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/قائمة المستودعات']);
  }

}
