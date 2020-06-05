import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { DistrictEditComponent } from './district-edit.component';

@Injectable({
  providedIn: 'root'
})
export class DistrictEditGuard implements CanDeactivate<DistrictEditComponent> {
  canDeactivate(component: DistrictEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.districtForm.dirty) {
      const name = component.districtForm.get('nameDistrict').value || 'New District';
      return confirm(`Navigate away and lose all changes to ${name}?`);
    }
    return true;
  }
}
