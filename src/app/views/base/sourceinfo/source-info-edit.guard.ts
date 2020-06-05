import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { SourceInfoEditComponent } from './source-info-edit.component';

@Injectable({
  providedIn: 'root'
})
export class SourceInfoEditGuard implements CanDeactivate<SourceInfoEditComponent> {
  canDeactivate(component: SourceInfoEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.sourceInfoForm.dirty) {
      const name = component.sourceInfoForm.get('nameAgent').value || 'New SourceInfo';
      return confirm(`Navigate away and lose all changes to ${name}?`);
    }
    return true;
  }
}
