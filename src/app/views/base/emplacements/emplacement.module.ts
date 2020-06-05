import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EmplacementListComponent } from './emplacement-list.component';
import { EmplacementDetailComponent } from './emplacement-detail.component';
import { EmplacementEditComponent } from './emplacement-edit.component';
import { EmplacementEditGuard} from './emplacement-edit.guard';


@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'قائمة المواقع', component: EmplacementListComponent },
      { path: 'تفاصيل  المواقع ;/:id', component: EmplacementDetailComponent },
      {
        path: 'تحديث المواقع/:id/edit',
        canDeactivate: [EmplacementEditGuard],
        component: EmplacementEditComponent
      }
    ])
  ],
  declarations: [
    EmplacementListComponent,
    EmplacementDetailComponent,
   EmplacementEditComponent
  ]
})
export class EmplacementModule { }