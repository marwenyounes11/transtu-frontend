import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { DepotEditComponent } from './depot-edit.component';

@Injectable({
  providedIn: 'root'
})
export class DepotEditGuard implements CanDeactivate<DepotEditComponent> {
  canDeactivate(component: DepotEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.depotForm.dirty) {
      const name = component.depotForm.get('nameDepot').value || 'New Depot';
      return confirm(`Navigate away and lose all changes to ${name}?`);
    }
    return true;
  }
}
