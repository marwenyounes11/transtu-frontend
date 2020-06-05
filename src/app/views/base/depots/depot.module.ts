import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DepotListComponent } from './depot-list.component';
import { DepotDetailComponent } from './depot-detail.component';
import { DepotEditComponent } from './depot-edit.component';
import { DepotEditGuard} from './depot-edit.guard';


@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
     { path: 'قائمة المستودع', component: DepotListComponent },
      { path: 'تفاصيل المستودعات/:id', component: DepotDetailComponent },
      {
        path: 'تحديث  المستودعات/:id/edit',
        canDeactivate: [DepotEditGuard],
        component: DepotEditComponent
      }
    ])
  ],
  declarations: [
    DepotListComponent,
    DepotDetailComponent,
   DepotEditComponent
  ]
})
export class DepotModule { }