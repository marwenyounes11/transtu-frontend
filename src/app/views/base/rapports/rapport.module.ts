import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RapportTravailListComponent } from './rapport-travail-list.component';
import { RapportCollisionListComponent } from './rapport-collision-list.component';
import { RapportRouteListComponent } from './rapport-route-list.component';
import { RapportTravailEditComponent } from './rapport-travail-edit.component';
import { RapportTravailEditGuard} from './rapport-travail-edit.guard';
import { RapportRouteEditComponent } from './rapport-route-edit.component';
import { RapportRouteEditGuard } from './rapport-route-edit.guard';
import { RapportCollisionEditComponent } from './rapport-collision-edit.component';
import { RapportCollisionEditGuard } from './rapport-collision-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'تقرير شغل', component: RapportTravailListComponent },
      { path: 'تقرير مرور', component: RapportCollisionListComponent },
      { path: 'تقرير طريق', component: RapportRouteListComponent },
      {
        path: 'rapportstravail/:id/edit',
        canDeactivate: [RapportTravailEditGuard],
        component: RapportTravailEditComponent
      },
       {
        path: 'rapportscollision/:id/edit',
        canDeactivate: [RapportCollisionEditGuard],
        component: RapportCollisionEditComponent
      },
       {
        path: 'rapportsroute/:id/edit',
        canDeactivate: [RapportRouteEditGuard],
        component: RapportRouteEditComponent
      }
    ])
  ],
  declarations: [
    RapportTravailListComponent,
    RapportCollisionListComponent,
    RapportRouteListComponent,
   RapportTravailEditComponent,
   RapportRouteEditComponent,
  RapportCollisionEditComponent
  ]
})
export class RapportModule { }