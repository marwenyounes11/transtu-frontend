import { Component, OnInit } from '@angular/core';

import { AgentPcrDto } from './agentpcrdto';
import {AgentPcrService } from './agentpcr.service';

@Component({
  selector: 'app-agentpcr',
  templateUrl: './agent-pcr-list.component.html',
  styleUrls: ['./agent-pcr-list.component.css']
})
export class AgentPcrListComponent implements OnInit {
  pageTitle = 'قائمة العمال المكلفين بتسجيل  الحوادث  ';
  
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredAgentPcr = this.listFilter ? this.performFilter(this.listFilter) : this.agentspcr;
  }

  filteredAgentPcr: AgentPcrDto[] = [];
 agentspcr: AgentPcrDto[] = [];

  constructor(private agentPcrService: AgentPcrService) { }


  performFilter(filterBy: string): AgentPcrDto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.agentspcr.filter((agentpcr: AgentPcrDto) =>
      agentpcr.nameAgent.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.agentPcrService.getAgentsPcr().subscribe(
      agentspcr => {
        this.agentspcr = agentspcr ;
        this.filteredAgentPcr = this.agentspcr;
      },
      error => this.errorMessage = <any>error
    );
  }

  
}
