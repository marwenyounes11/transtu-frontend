import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';




import { ChauffeurListComponent } from './chauffeur-list.component';
import { ChauffeurDetailComponent } from './chauffeur-detail.component';
import { ChauffeurEditComponent } from './chauffeur-edit.component';
import { ChauffeurEditGuard } from './chauffeur-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'قائمة السائقين', component: ChauffeurListComponent },
      { path: 'chauffeurs/:id', component: ChauffeurDetailComponent },
      {
        path: 'chauffeurs/:id/edit',
        canDeactivate: [ChauffeurEditGuard],
        component: ChauffeurEditComponent
      }
    ])
  ],
  declarations: [
    ChauffeurListComponent,
    ChauffeurDetailComponent,
    ChauffeurEditComponent
  ]
})
export class ChauffeurModule { }
