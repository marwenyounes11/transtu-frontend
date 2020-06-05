import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DegatMaterielListComponent } from './degat-materiel-list.component';
import { DegatMaterielDetailComponent } from './degat-materiel-detail.component';
import { DegatMaterielEditComponent } from './degat-materiel-edit.component';
import { DegatMaterielEditGuard } from './degat-materiel-edit.guard';
import { DegatPhysiqueListComponent } from './degat-physique-list.component';
import { DegatPhysiqueDetailComponent } from './degat-physique-detail.component';
import { DegatPhysiqueEditComponent } from './degat-physique-edit.component';
import { DegatPhysiqueEditGuard } from './degat-physique-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'قائمة الاضرار البدنية', component: DegatPhysiqueListComponent },
      { path: 'قائمة الاضرار المادية', component: DegatMaterielListComponent },
      { path: 'تفاصيل الاضرار المادية,/:id', component: DegatPhysiqueDetailComponent },
      { path:'تفاصيل الاضرار المادية,/:id', component: DegatMaterielDetailComponent },
      {
        path: 'تحديث الاضرار البدنية/:id/edit',
        canDeactivate: [DegatPhysiqueEditGuard],
        component: DegatPhysiqueEditComponent
      },
       {
        path: 'تحديث الاضرار المادية/:id/edit',
        canDeactivate: [DegatMaterielEditGuard],
        component: DegatMaterielEditComponent
      }
    ])
  ],
  declarations: [
    DegatPhysiqueListComponent,
    DegatPhysiqueDetailComponent,
    DegatPhysiqueEditComponent,
    DegatMaterielListComponent,
    DegatMaterielDetailComponent,
    DegatMaterielEditComponent
  ]
})
export class DegatModule { }
