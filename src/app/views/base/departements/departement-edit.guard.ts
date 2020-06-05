import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { DepartementEditComponent } from './departement-edit.component';

@Injectable({
  providedIn: 'root'
})
export class DepartementEditGuard implements CanDeactivate<DepartementEditComponent> {
  canDeactivate(component: DepartementEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.departementForm.dirty) {
      const name = component.departementForm.get('nameDept').value || 'New Departement';
      return confirm(`Navigate away and lose all changes to ${name}?`);
    }
    return true;
  }
}
