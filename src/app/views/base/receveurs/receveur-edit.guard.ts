import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { ReceveurEditComponent } from './receveur-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ReceveurEditGuard implements CanDeactivate<ReceveurEditComponent> {
  canDeactivate(component: ReceveurEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.receveurForm.dirty) {
      const name = component.receveurForm.get('nameReceveur').value || 'New Receveur';
      return confirm(`Navigate away and lose all changes to ${name}?`);
    }
    return true;
  }
}
