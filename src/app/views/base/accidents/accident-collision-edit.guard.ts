import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { AccidentCollisionEditComponent } from './accident-collision-edit.component';

@Injectable({
  providedIn: 'root'
})
export class AccidentCollisionEditGuard implements CanDeactivate<AccidentCollisionEditComponent> {
  canDeactivate(component: AccidentCollisionEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.accidentCollisionForm.dirty) {
      const time = component.accidentCollisionForm.get('timeAccident').value || 'New AccidentCollision';
      return confirm(`Navigate away and lose all changes to ${time}?`);
    }
    return true;
  }
}
