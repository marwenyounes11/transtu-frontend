import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { BusEditComponent } from './bus-edit.component';

@Injectable({
  providedIn: 'root'
})
export class BusEditGuard implements CanDeactivate<BusEditComponent> {
  canDeactivate(component: BusEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.busForm.dirty) {
      const numBus = component.busForm.get('numBus').value || 'New Bus';
      return confirm(`Navigate away and lose all changes to ${numBus}?`);
    }
    return true;
  }
}
