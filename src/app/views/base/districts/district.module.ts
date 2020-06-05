import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DistrictListComponent } from './district-list.component';
import { DistrictDetailComponent } from './district-detail.component';
import { DistrictEditComponent } from './district-edit.component';
import { DistrictEditGuard} from './district-edit.guard';


@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'قائمة الاقاليم', component: DistrictListComponent },
      { path: 'تفاصيل  الاقاليم ;/:id', component: DistrictDetailComponent },
      {
        path: 'تحديث الاقاليم/:id/edit',
        canDeactivate: [DistrictEditGuard],
        component: DistrictEditComponent
      }
    ])
  ],
  declarations: [
    DistrictListComponent,
    DistrictDetailComponent,
   DistrictEditComponent
  ]
})
export class DistrictModule { }