import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { MetroEditComponent } from './metro-edit.component';

@Injectable({
  providedIn: 'root'
})
export class MetroEditGuard implements CanDeactivate<MetroEditComponent> {
  canDeactivate(component: MetroEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.metroForm.dirty) {
      const numMetro = component.metroForm.get('numMetro').value || 'New Metro';
      return confirm(`Navigate away and lose all changes to ${numMetro}?`);
    }
    return true;
  }
}