import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { VictimeEditComponent } from './victime-edit.component';

@Injectable({
  providedIn: 'root'
})
export class VictimeEditGuard implements CanDeactivate<VictimeEditComponent> {
  canDeactivate(component: VictimeEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.victimeForm.dirty) {
      const name = component.victimeForm.get('nameVictime').value || 'New Victime';
      return confirm(`Navigate away and lose all changes to ${name}?`);
    }
    return true;
  }
}
