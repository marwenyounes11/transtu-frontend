import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { RapportCollisionEditComponent } from './rapport-collision-edit.component';

@Injectable({
  providedIn: 'root'
})
export class RapportCollisionEditGuard implements CanDeactivate<RapportCollisionEditComponent> {
  canDeactivate(component: RapportCollisionEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.rapportCollisionForm.dirty) {
      const time = component.rapportCollisionForm.get('timeAccident').value || 'New RapportCollision';
      return confirm(`Navigate away and lose all changes to ${time}?`);
    }
    return true;
  }
}
