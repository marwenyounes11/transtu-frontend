import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BusListComponent } from './bus-list.component';
import { BusDetailComponent } from './bus-detail.component';
import { BusEditComponent } from './bus-edit.component';
import { BusEditGuard } from './bus-edit.guard';
import { TrainListComponent } from './train-list.component';
import { TrainEditComponent } from './train-edit.component';
import { TrainEditGuard } from './train-edit.guard';
import { MetroListComponent } from './metro-list.component';
import { MetroEditComponent } from './metro-edit.component';
import { MetroEditGuard } from './metro-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'base/قائمةحافلات', component: BusListComponent },
      { path: 'base/قائمةمترو', component: MetroListComponent },
      { path: 'base/قائمةقطارات', component: TrainListComponent },
      { path: 'base/تفاصيل الحافلات/:id', component: BusDetailComponent },
    
      {
        path: 'base/تحديث  الحافلات/:id/edit',
        canDeactivate: [BusEditGuard],
        component: BusEditComponent
      },
       {
        path: 'base/تحديث المترو/:id/edit',
        canDeactivate: [MetroEditGuard],
        component: MetroEditComponent
      },
      {
        path: 'base/تحديث القطارات/:id/edit',
        canDeactivate: [TrainEditGuard],
        component: TrainEditComponent
      }
    ])
  ],
  declarations: [
    BusListComponent,
    BusDetailComponent,
    BusEditComponent,
    MetroListComponent,
    MetroEditComponent,
    TrainListComponent,
    TrainEditComponent
  ]
})
export class TransportModule { }
