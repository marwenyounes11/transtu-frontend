import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceveurDto } from './receveurdto';
import { ReceveurService } from './receveur.service';

@Component({
  templateUrl: './receveur-detail.component.html',
  styleUrls: ['./receveur-detail.component.css']
})
export class ReceveurDetailComponent implements OnInit {
  pageTitle = 'تفاصيل القباض';
  errorMessage = '';
  receveur: ReceveurDto | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private receveurService: ReceveurService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getReceveur(id);
    }
  }

  getReceveur(id: number) {
    this.receveurService.getReceveur(id).subscribe(
      receveur => this.receveur = receveur,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/قائمة القباض']);
  }

}
