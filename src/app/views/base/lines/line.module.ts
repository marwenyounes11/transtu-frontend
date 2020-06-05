import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LineListComponent } from './line-list.component';
import { LineDetailComponent } from './line-detail.component';
import { LineEditComponent } from './line-edit.component';
import { LineEditGuard} from './line-edit.guard';


@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: 'قائمة الخط', component: LineListComponent },
      { path: 'تفاصيل  الخطوط ;/:id', component: LineDetailComponent },
      {
        path: 'تحديث الخطوط /:id/edit',
        canDeactivate: [LineEditGuard],
        component: LineEditComponent
      }
    ])
  ],
  declarations: [
    LineListComponent,
    LineDetailComponent,
   LineEditComponent
  ]
})
export class LineModule { }