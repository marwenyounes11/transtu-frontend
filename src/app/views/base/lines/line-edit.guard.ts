import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { LineEditComponent } from './line-edit.component';

@Injectable({
  providedIn: 'root'
})
export class LineEditGuard implements CanDeactivate<LineEditComponent> {
  canDeactivate(component: LineEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.lineForm.dirty) {
      const name = component.lineForm.get('nameLine').value || 'New Line';
      return confirm(`Navigate away and lose all changes to ${name}?`);
    }
    return true;
  }
}
