import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { AccidentTravailEditComponent } from './accident-travail-edit.component';

@Injectable({
  providedIn: 'root'
})
export class AccidentTravailEditGuard implements CanDeactivate<AccidentTravailEditComponent> {
  canDeactivate(component: AccidentTravailEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.accidentTravailForm.dirty) {
      const time = component.accidentTravailForm.get('timeAccident').value || 'New AccidentTravail';
      return confirm(`Navigate away and lose all changes to ${time}?`);
    }
    return true;
  }
}
