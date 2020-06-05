import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { EmplacementEditComponent } from './emplacement-edit.component';

@Injectable({
  providedIn: 'root'
})
export class EmplacementEditGuard implements CanDeactivate<EmplacementEditComponent> {
  canDeactivate(component: EmplacementEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.emplacementForm.dirty) {
      const name = component.emplacementForm.get('nameEmplacement').value || 'New Emplacement';
      return confirm(`Navigate away and lose all changes to ${name}?`);
    }
    return true;
  }
}
