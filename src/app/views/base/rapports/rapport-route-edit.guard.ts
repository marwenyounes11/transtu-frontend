import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { RapportRouteEditComponent } from './rapport-route-edit.component';

@Injectable({
  providedIn: 'root'
})
export class RapportRouteEditGuard implements CanDeactivate<RapportRouteEditComponent> {
  canDeactivate(component: RapportRouteEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.rapportRouteForm.dirty) {
      const time = component.rapportRouteForm.get('timeAccident').value || 'New RapportRoute';
      return confirm(`Navigate away and lose all changes to ${time}?`);
    }
    return true;
  }
}
