import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { DegatMaterielEditComponent } from './degat-materiel-edit.component';

@Injectable({
  providedIn: 'root'
})
export class DegatMaterielEditGuard implements CanDeactivate<DegatMaterielEditComponent> {
  canDeactivate(component: DegatMaterielEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.degatMaterielForm.dirty) {
      const descriptionDegat = component.degatMaterielForm.get('descriptionDegat').value || 'New DegatMateriel';
      return confirm(`Navigate away and lose all changes to ${descriptionDegat}?`);
    }
    return true;
  }
}