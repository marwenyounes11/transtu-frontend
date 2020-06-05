import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SourceInfoListComponent } from './source-info-list.component';
import { SourceInfoDetailComponent } from './source-info-detail.component';
import { SourceInfoEditComponent } from './source-info-edit.component';
import { SourceInfoEditGuard} from './source-info-edit.guard';


@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'قائمةاعلام', component: SourceInfoListComponent },
      { path: ' تفاصيل مصدر  الاعلام/:id', component: SourceInfoDetailComponent },
      {
        path: 'تحديث مصدر الاعلام  /:id/edit',
        canDeactivate: [SourceInfoEditGuard],
        component: SourceInfoEditComponent
      }
    ])
  ],
  declarations: [
    SourceInfoListComponent,
    SourceInfoDetailComponent,
   SourceInfoEditComponent
  ]
})
export class SourceInfoModule { }