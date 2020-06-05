import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { ChauffeurEditComponent } from './chauffeur-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurEditGuard implements CanDeactivate<ChauffeurEditComponent> {
  canDeactivate(component: ChauffeurEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.chauffeurForm.dirty) {
      const nameChauffeur = component.chauffeurForm.get('nameChauffeur').value || 'New Chauffeur';
      return confirm(`هل تريد الغاء تحديث ${nameChauffeur}?`);
    }
    return true;
  }
}
