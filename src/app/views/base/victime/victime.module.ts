import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { VictimeListComponent } from './victime-list.component';
import { VictimeDetailComponent } from './victime-detail.component';
import { VictimeEditComponent } from './victime-edit.component';
import { VictimeEditGuard} from './victime-edit.guard';


@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'قائمةضحايا', component: VictimeListComponent },
      { path: 'تفاصيل  الضحايا/:id', component: VictimeDetailComponent },
      {
        path: 'تحديث  الضحايا/:id/edit',
        canDeactivate: [VictimeEditGuard],
        component: VictimeEditComponent
      }
    ])
  ],
  declarations: [
    VictimeListComponent,
    VictimeDetailComponent,
   VictimeEditComponent
  ]
})
export class VictimeModule { }