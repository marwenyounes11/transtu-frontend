import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DepartementListComponent } from './departement-list.component';
import { DepartementDetailComponent } from './departement-detail.component';
import { DepartementEditComponent } from './departement-edit.component';
import { DepartementEditGuard} from './departement-edit.guard';


@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'قائمة المباني', component: DepartementListComponent },
      { path: 'تفاصيل المباني/:id', component: DepartementDetailComponent },
      {
        path: 'تحديث  المباني/:id/edit',
        canDeactivate: [DepartementEditGuard],
        component: DepartementEditComponent
      }
    ])
  ],
  declarations: [
    DepartementListComponent,
    DepartementDetailComponent,
   DepartementEditComponent
  ]
})
export class DepartementModule { }