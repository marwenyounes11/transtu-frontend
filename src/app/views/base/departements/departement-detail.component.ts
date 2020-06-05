import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartementDto } from './departementdto';
import { DepartementService } from './departement.service';

@Component({
  templateUrl: './departement-detail.component.html',
  styleUrls: ['./departement-detail.component.css']
})
export class DepartementDetailComponent implements OnInit {
  pageTitle = 'تفاصيل المباني';
  errorMessage = '';
  departement: DepartementDto | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private departementService: DepartementService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getDepartement(id);
    }
  }

  getDepartement(id: number) {
    this.departementService.getDepartement(id).subscribe(
      departement => this.departement = departement,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/قائمة المباني ']);
  }

}
