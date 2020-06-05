import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RecordListComponent } from './record-list.component';
import { RecordDetailComponent } from './record-detail.component';
import { RecordEditComponent } from './record-edit.component';
import { RecordEditGuard} from './record-edit.guard';


@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: 'قائمة محضر', component: RecordListComponent },
      { path: ' تفاصيل المحاضر/ :id', component: RecordDetailComponent },
      {
        path: 'تحديث المحاض/:id/edit',
        canDeactivate: [RecordEditGuard],
        component: RecordEditComponent
      }
    ])
  ],
  declarations: [
    RecordListComponent,
    RecordDetailComponent,
   RecordEditComponent
  ]
})
export class RecordModule { }