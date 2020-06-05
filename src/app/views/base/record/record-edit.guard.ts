import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { RecordEditComponent } from './record-edit.component';

@Injectable({
  providedIn: 'root'
})
export class RecordEditGuard implements CanDeactivate<RecordEditComponent> {
  canDeactivate(component: RecordEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.recordForm.dirty) {
      const descriptionRecord = component.recordForm.get('descriptionRecord').value || 'New Record';
      return confirm(`Navigate away and lose all changes to ${descriptionRecord}?`);
    }
    return true;
  }
}
