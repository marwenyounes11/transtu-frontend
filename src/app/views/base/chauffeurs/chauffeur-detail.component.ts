import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Chauffeur } from './chauffeur';
import { ChauffeurService } from './chauffeur.service';

@Component({
  templateUrl: './chauffeur-detail.component.html',
  styleUrls: ['./chauffeur-detail.component.css']
})
export class ChauffeurDetailComponent implements OnInit {
  pageTitle = 'Chauffeur Detail';
  errorMessage = '';
  chauffeur: Chauffeur | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private chauffeurService: ChauffeurService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getChauffeur(id);
    }
  }

  getChauffeur(id: number) {
    this.chauffeurService.getChauffeur(id).subscribe(
      chauffeur => this.chauffeur = chauffeur,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/قائمة السائقين']);
  }

}
