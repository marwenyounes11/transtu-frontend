import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { AccidentRouteEditComponent } from './accident-route-edit.component';

@Injectable({
  providedIn: 'root'
})
export class AccidentRouteEditGuard implements CanDeactivate<AccidentRouteEditComponent> {
  canDeactivate(component: AccidentRouteEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.accidentRouteForm.dirty) {
      const time = component.accidentRouteForm.get('timeAccident').value || 'New AccidentRoute';
      return confirm(`Navigate away and lose all changes to ${time}?`);
    }
    return true;
  }
}
