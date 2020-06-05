import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



import { AccidentTravailListComponent } from './accident-travail-list.component';
import { AccidentCollisionListComponent } from './accident-collision-list.component';
import { AccidentRouteListComponent } from './accident-route-list.component';
import { AccidentTravailDetailComponent } from './accident-travail-detail.component';
import { AccidentTravailEditComponent } from './accident-travail-edit.component';
import { AccidentTravailEditGuard} from './accident-travail-edit.guard';
import { AccidentRouteDetailComponent } from './accident-route-detail.component';
import { AccidentRouteEditComponent } from './accident-route-edit.component';
import { AccidentRouteEditGuard } from './accident-route-edit.guard';
import { AccidentCollisionDetailComponent } from './accident-collision-detail.component';
import { AccidentCollisionEditComponent } from './accident-collision-edit.component';
import { AccidentCollisionEditGuard } from './accident-collision-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'accidentstravail', component: AccidentTravailListComponent },
      { path: 'accidentscollision', component: AccidentCollisionListComponent },
      { path: 'accidentsroute', component: AccidentRouteListComponent },
      { path: 'accidentstravail/:id', component: AccidentTravailDetailComponent },
       { path: 'accidentscollision/:id', component: AccidentCollisionDetailComponent },
        { path: 'accidentsroute/:id', component: AccidentRouteDetailComponent },
      {
        path: 'accidentstravail/:id/edit',
        canDeactivate: [AccidentTravailEditGuard],
        component: AccidentTravailEditComponent
      },
       {
        path: 'accidentscollision/:id/edit',
        canDeactivate: [AccidentCollisionEditGuard],
        component: AccidentCollisionEditComponent
      },
       {
        path: 'accidentsroute/:id/edit',
        canDeactivate: [AccidentRouteEditGuard],
        component: AccidentRouteEditComponent
      }
    ])
  ],
  declarations: [
    AccidentTravailListComponent,
    AccidentCollisionListComponent,
    AccidentRouteListComponent,
    AccidentTravailDetailComponent,
   AccidentTravailEditComponent,
   AccidentRouteDetailComponent,
   AccidentRouteEditComponent,
   AccidentCollisionDetailComponent,
  AccidentCollisionEditComponent
  ]
})
export class AccidentModule { }
