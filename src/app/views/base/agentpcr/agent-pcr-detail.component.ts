import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AgentPcrDto } from './agentpcrdto';
import { AgentPcrService } from './agentpcr.service';

@Component({
  templateUrl: './agent-pcr-detail.component.html',
  styleUrls: ['./agent-pcr-detail.component.css']
})
export class AgentPcrDetailComponent implements OnInit {
  pageTitle = 'تفاصيل عامل  القاعة ';
  errorMessage = '';
  agentpcr: AgentPcrDto | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private agentPcrService: AgentPcrService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getAgentPcr(id);
    }
  }

  getAgentPcr(id: number) {
    this.agentPcrService.getAgentPcr(id).subscribe(
      agentpcr => this.agentpcr = agentpcr,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/قائمة عمال   ']);
  }

}
