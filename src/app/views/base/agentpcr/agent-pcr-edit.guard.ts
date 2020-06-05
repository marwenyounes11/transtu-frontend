import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { AgentPcrEditComponent } from './agent-pcr-edit.component';

@Injectable({
  providedIn: 'root'
})
export class AgentPcrEditGuard implements CanDeactivate<AgentPcrEditComponent> {
  canDeactivate(component: AgentPcrEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.agentPcrForm.dirty) {
      const name = component.agentPcrForm.get('nameAgent').value || 'New AgentPcr';
      return confirm(`Navigate away and lose all changes to ${name}?`);
    }
    return true;
  }
}
