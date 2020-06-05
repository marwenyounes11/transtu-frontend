import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { DegatPhysiqueEditComponent } from './degat-physique-edit.component';

@Injectable({
  providedIn: 'root'
})
export class DegatPhysiqueEditGuard implements CanDeactivate<DegatPhysiqueEditComponent> {
  canDeactivate(component: DegatPhysiqueEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.degatPhysiqueForm.dirty) {
      const descriptionDegat = component.degatPhysiqueForm.get('descriptionDegat').value || 'New DegatPhysique';
      return confirm(`Navigate away and lose all changes to ${descriptionDegat}?`);
    }
    return true;
  }
}