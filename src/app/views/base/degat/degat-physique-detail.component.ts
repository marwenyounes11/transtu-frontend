import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DegatPhysiqueDto } from './degatphysiquedto';
import { DegatService } from './degat.service';

@Component({
  templateUrl: './degat-physique-detail.component.html',
  styleUrls: ['./degat-physique-detail.component.css']
})
export class DegatPhysiqueDetailComponent implements OnInit {
  pageTitle = 'تفاصيل الاضرار البدنية ';
  errorMessage = '';
  degatphysique: DegatPhysiqueDto | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private degatService: DegatService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getDegatPhysique(id);
    }
  }

  getDegatPhysique(id: number) {
    this.degatService.getDegatPhysique(id).subscribe(
      degatphysique => this.degatphysique = degatphysique,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/قائمة الاضرار البدنية']);
  }

}
