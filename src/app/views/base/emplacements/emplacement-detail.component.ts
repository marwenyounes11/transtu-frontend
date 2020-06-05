import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmplacementDto } from './emplacementdto';
import { EmplacementService } from './emplacement.service';

@Component({
  templateUrl: './emplacement-detail.component.html',
  styleUrls: ['./emplacement-detail.component.css']
})
export class EmplacementDetailComponent implements OnInit {
  pageTitle = 'تفاصيل المواقع';
  errorMessage = '';
  emplacement: EmplacementDto | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private emplacementService: EmplacementService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getEmplacement(id);
    }
  }

  getEmplacement(id: number) {
    this.emplacementService.getEmplacement(id).subscribe(
      emplacement => this.emplacement = emplacement,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/قائمة المواقع']);
  }

}
