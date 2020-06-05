import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DegatMaterielDto } from './degatmaterieldto';
import { DegatService } from './degat.service';

@Component({
  templateUrl: './degat-materiel-detail.component.html',
  styleUrls: ['./degat-materiel-detail.component.css']
})
export class DegatMaterielDetailComponent implements OnInit {
  pageTitle = 'تفاصيل الاضرار  المادية ';
  errorMessage = '';
  degatmateriel: DegatMaterielDto | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private degatService: DegatService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getDegatMateriel(id);
    }
  }

  getDegatMateriel(id: number) {
    this.degatService.getDegatMateriel(id).subscribe(
      degatmateriel => this.degatmateriel = degatmateriel,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/قائمة الاضرار المادية']);
  }

}
