import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { RapportTravailEditComponent } from './rapport-travail-edit.component';

@Injectable({
  providedIn: 'root'
})
export class RapportTravailEditGuard implements CanDeactivate<RapportTravailEditComponent> {
  canDeactivate(component: RapportTravailEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.rapportTravailForm.dirty) {
      const time = component.rapportTravailForm.get('timeAccident').value || 'New RapportTravail';
      return confirm(`Navigate away and lose all changes to ${time}?`);
    }
    return true;
  }
}
