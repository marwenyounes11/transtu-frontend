import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { TrainEditComponent } from './train-edit.component';

@Injectable({
  providedIn: 'root'
})
export class TrainEditGuard implements CanDeactivate<TrainEditComponent> {
  canDeactivate(component: TrainEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.trainForm.dirty) {
      const numTrain = component.trainForm.get('numTrain').value || 'New Train';
      return confirm(`Navigate away and lose all changes to ${numTrain}?`);
    }
    return true;
  }
}