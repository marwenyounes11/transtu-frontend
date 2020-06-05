import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ReceveurListComponent } from './receveur-list.component';
import { ReceveurDetailComponent } from './receveur-detail.component';
import { ReceveurEditComponent } from './receveur-edit.component';
import { ReceveurEditGuard} from './receveur-edit.guard';


@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
       { path: 'receveur', component: ReceveurListComponent },
      { path: 'receveur/:id', component: ReceveurDetailComponent },
      {
        path: 'receveur/:id/edit',
        canDeactivate: [ReceveurEditGuard],
        component: ReceveurEditComponent
      }
    ])
  ],
  declarations: [
    ReceveurListComponent,
    ReceveurDetailComponent,
   ReceveurEditComponent
  ]
})
export class ReceveurModule { }